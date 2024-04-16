export interface IMilestone {
  id?: string
  name: string
  description: string
  milestoneType: string
  milestoneEntity: string
  count: number
  bonus_points: number
  milestone: {
    bonus_points: number
    count: number
    description: string
    milestoneEntity: string
    milestoneType: string
    name: string
    id: string
  }
}
