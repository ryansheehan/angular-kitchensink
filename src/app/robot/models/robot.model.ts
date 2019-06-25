export interface IRobot {
  id: number;
  name: string;
}

export type RobotTemplate = Exclude<IRobot, 'id'>;
