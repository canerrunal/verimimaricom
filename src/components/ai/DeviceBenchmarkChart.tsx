import type { AiLabBenchmark } from '@/lib/ai-lab-catalog'

type Comparison = {
  deviceId: string
  deviceName: string
  speed: number
}

const deviceLabels: Record<string, string> = {
  'a6000-workstation': 'A6000',
  'rtx-4060-laptop': 'RTX 4060 Dizüstü',
  'mac-mini-m4': 'Mac mini M4',
  'jetson-orin-nano-super': 'Jetson Orin Nano',
  'raspberry-pi-5-8gb': 'Raspberry Pi 5',
}

function formatSpeed(value: number) {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 }).format(value)
}

function pickComparison(benchmarks: AiLabBenchmark[]) {
  const preferred = benchmarks.filter(
    (item) => item.modelId === 'gemma3-4b' && item.quantization === 'Q4_K_M',
  )

  const groups = new Map<string, AiLabBenchmark[]>()
  for (const item of benchmarks) {
    const key = `${item.modelId}::${item.quantization}`
    groups.set(key, [...(groups.get(key) ?? []), item])
  }

  const widestGroup = [...groups.values()].sort(
    (a, b) => new Set(b.map((item) => item.deviceId)).size - new Set(a.map((item) => item.deviceId)).size,
  )[0]

  const source = preferred.length >= 2 ? preferred : widestGroup ?? []
  const uniqueDevices = new Map<string, AiLabBenchmark>()
  for (const item of source) {
    const current = uniqueDevices.get(item.deviceId)
    if (!current || item.measuredAt > current.measuredAt) uniqueDevices.set(item.deviceId, item)
  }

  const rows: Comparison[] = [...uniqueDevices.values()]
    .map((item) => ({
      deviceId: item.deviceId,
      deviceName: deviceLabels[item.deviceId] ?? item.deviceName,
      speed: item.decodeTokensPerSecond,
    }))
    .sort((a, b) => b.speed - a.speed)

  const sample = source[0]
  const latestMeasurement = source.reduce(
    (latest, item) => (item.measuredAt > latest ? item.measuredAt : latest),
    sample?.measuredAt ?? '',
  )

  return { rows, sample, latestMeasurement }
}

export default function DeviceBenchmarkChart({
  benchmarks,
  benchmarkCount,
  measuredDeviceCount,
  modelCount,
}: {
  benchmarks: AiLabBenchmark[]
  benchmarkCount: number
  measuredDeviceCount: number
  modelCount: number
}) {
  const { rows, sample, latestMeasurement } = pickComparison(benchmarks)
  const maximum = Math.max(...rows.map((row) => row.speed), 1)

  if (!sample || !rows.length) return null

  return (
    <section className="device-benchmark-section" aria-labelledby="cihaz-karsilastirma-basligi">
      <div className="wrap">
        <div className="device-benchmark-card">
          <div className="device-benchmark-heading">
            <span>LABORATUVAR DURUMU</span>
            <time dateTime={latestMeasurement}>Son ölçüm: {latestMeasurement.split('-').reverse().join('.')}</time>
          </div>

          <div className="device-benchmark-stats" aria-label="Model laboratuvarı özeti">
            <div>
              <strong>{benchmarkCount}</strong>
              <small>Ölçüm Kaydı</small>
            </div>
            <div>
              <strong>{measuredDeviceCount}</strong>
              <small>Ölçüm ekipmanı</small>
            </div>
            <div>
              <strong>{modelCount}</strong>
              <small>Ölçüm modeli</small>
            </div>
          </div>

          <div className="device-benchmark-plot">
            <div className="device-benchmark-title">
              <span>AYNI MODEL / AYNI KUANTİZASYON</span>
              <h2 id="cihaz-karsilastirma-basligi">
                {sample.modelName} <em>{sample.quantization}</em> — üretim hızı
              </h2>
            </div>
            <div className="device-benchmark-bars">
              {rows.map((row) => (
                <div className="device-benchmark-row" key={row.deviceId}>
                  <span>{row.deviceName}</span>
                  <div
                    className="device-benchmark-track"
                    role="img"
                    aria-label={`${row.deviceName}: saniyede ${formatSpeed(row.speed)} token`}
                  >
                    <i style={{ width: `${Math.max((row.speed / maximum) * 100, 2)}%` }} />
                  </div>
                  <strong>{formatSpeed(row.speed)}</strong>
                </div>
              ))}
            </div>
          </div>

          <p className="device-benchmark-note">
            Aynı koşul / {sample.runtime} / 2 kez ortalama / num_predict=256
          </p>
        </div>
      </div>
    </section>
  )
}
