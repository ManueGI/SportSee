export default class PerformanceModel {
  constructor({ userId = null, kind = {}, data = [] } = {}) {
    this.userId = userId != null ? Number(userId) : null
    this.kind = kind || {}
    this.data = Array.isArray(data)
      ? data.map(d => ({
          value: d.value ?? d.score ?? null,
          kind: d.kind ?? null,
          label: (d.kind && (kind?.[d.kind] ?? kind?.[String(d.kind)])) ?? null
        }))
      : []
  }

  static fromApi(raw = {}) {
    if (!raw) return null
    const src = raw.data && typeof raw.data === 'object' && (Array.isArray(raw.data.data) || raw.data.kind)
      ? raw.data
      : raw

    return new PerformanceModel({
      userId: src.userId ?? src.id ?? null,
      kind: src.kind ?? src.kindMap ?? {},
      data: src.data ?? src.performance ?? []
    })
  }
}
