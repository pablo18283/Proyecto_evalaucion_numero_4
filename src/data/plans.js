export const WEEK_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const PLANS = {
  Principiante: [
    { day: 'monday', focusKey: 'full_body' },
    { day: 'tuesday', focusKey: 'core_flexibility' },
    { day: 'wednesday', focusKey: 'upper_body' },
    { day: 'thursday', focusKey: 'lower_body' },
    { day: 'friday', focusKey: 'push_pull' },
    { day: 'saturday', focusKey: 'mobility' },
    { day: 'sunday', focusKey: 'active_recovery' },
  ],
  Intermedio: [
    { day: 'monday', focusKey: 'push_core' },
    { day: 'tuesday', focusKey: 'pull_legs' },
    { day: 'wednesday', focusKey: 'cardio_core' },
    { day: 'thursday', focusKey: 'legs_glutes' },
    { day: 'friday', focusKey: 'shoulders_arms' },
    { day: 'saturday', focusKey: 'mixed_strength' },
    { day: 'sunday', focusKey: 'recovery' },
  ],
  Avanzado: [
    { day: 'monday', focusKey: 'strength_push' },
    { day: 'tuesday', focusKey: 'strength_pull' },
    { day: 'wednesday', focusKey: 'hypertrophy_core' },
    { day: 'thursday', focusKey: 'power_legs' },
    { day: 'friday', focusKey: 'upper_strength' },
    { day: 'saturday', focusKey: 'full_body_intense' },
    { day: 'sunday', focusKey: 'active_rest' },
  ],
}
