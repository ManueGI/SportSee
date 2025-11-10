export default class UserModel {
  constructor({ id = null, userInfos = {}, todayScore = null, score = null, keyData = {} } = {}) {
    this.id = id != null ? Number(id) : null
    this.userInfos = userInfos || {}
    this.todayScore = todayScore != null ? Number(todayScore) : (score != null ? Number(score) : null)
    this.score = score != null ? Number(score) : (todayScore != null ? Number(todayScore) : null)
    this.keyData = {
      calorieCount: keyData?.calorieCount ?? keyData?.calorie_count ?? 0,
      proteinCount: keyData?.proteinCount ?? keyData?.protein_count ?? 0,
      carbohydrateCount: keyData?.carbohydrateCount ?? keyData?.carbohydrate_count ?? 0,
      lipidCount: keyData?.lipidCount ?? keyData?.lipid_count ?? 0
    }
  }

  static fromApi(raw = {}) {
    if (!raw) return null
    const src = raw.data ?? raw
    return new UserModel({
      id: src.id ?? src.userId ?? null,
      userInfos: src.userInfos ?? src.user ?? {},
      todayScore: src.todayScore ?? src.score ?? null,
      score: src.score ?? src.todayScore ?? null,
      keyData: src.keyData ?? src.key_data ?? {}
    })
  }
}
