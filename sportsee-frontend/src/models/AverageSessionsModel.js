export default class AverageSessionsModel {
  constructor({ userId = null, sessions = [] } = {}) {
    this.userId = userId != null ? Number(userId) : null
    this.sessions = Array.isArray(sessions)
      ? sessions.map(s => ({
          day: s.day ?? s.sessionDay ?? null,
          sessionLength: s.sessionLength ?? s.length ?? s.minute ?? null
        }))
      : []
  }

  static fromApi(raw = {}) {
    if (!raw) return null
    const src = raw.data ?? raw
    return new AverageSessionsModel({
      userId: src.userId ?? src.id ?? null,
      sessions: src.sessions ?? src.averageSessions ?? []
    })
  }
}
