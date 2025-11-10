export default class ActivityModel {
  constructor({ userId = null, sessions = [] } = {}) {
    this.userId = userId != null ? Number(userId) : null
    this.sessions = Array.isArray(sessions)
      ? sessions.map(s => ({
          day: s.day ?? s.date ?? null,
          kilogram: s.kilogram ?? s.kg ?? null,
          calories: s.calories ?? s.cal ?? null
        }))
      : []
  }

  static fromApi(raw = {}) {
    if (!raw) return null
    const src = raw.data ?? raw
    return new ActivityModel({
      userId: src.userId ?? src.id ?? null,
      sessions: src.sessions ?? src.activity ?? []
    })
  }
}
