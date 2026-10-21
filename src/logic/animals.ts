/** 动物园名册：连击达标解锁，Q版搞笑人设 */
export type AnimalId =
  | 'hamster' | 'shiba' | 'rabbit' | 'cat'
  | 'fox' | 'sloth' | 'owl' | 'bear'

export interface AnimalSkin {
  id: AnimalId
  name: string
  persona: string
  unlockAt: number // 需要的最长连击夜数，0 = 初始拥有
}

export const ANIMALS: AnimalSkin[] = [
  { id: 'hamster', name: '墩墩', persona: '睡神本神，梦想是睡成一颗球', unlockAt: 0 },
  { id: 'shiba', name: '旺财', persona: '早起遛弯宣传部部长，汪！', unlockAt: 2 },
  { id: 'rabbit', name: '跳跳', persona: '睡觉也竖着耳朵听八卦的卷王', unlockAt: 3 },
  { id: 'cat', name: '喵喵', persona: '白天高冷，晚上专门抢被子', unlockAt: 5 },
  { id: 'fox', name: '阿灵', persona: '装睡大师，其实你说的它全听见了', unlockAt: 7 },
  { id: 'sloth', name: '慢慢', persona: '和你比赖床，它认第二没人敢第一', unlockAt: 10 },
  { id: 'owl', name: '夜夜', persona: '熬夜冠军，正在劳动改造中', unlockAt: 14 },
  { id: 'bear', name: '冬冬', persona: '冬眠学家，动物园节气台柱子', unlockAt: 21 },
]

export const animalById = (id: AnimalId): AnimalSkin =>
  ANIMALS.find((a) => a.id === id) ?? ANIMALS[0]

/** 下一个待解锁的动物 */
export const nextUnlock = (maxStreak: number, ownedCount: number): AnimalSkin | undefined =>
  ANIMALS.slice(ownedCount).find((a) => a.unlockAt > maxStreak)
