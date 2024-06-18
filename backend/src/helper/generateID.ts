type Entity = {
  id: number;
  [key: string]: unknown;
};

export const generateId = (entity: Entity[]) =>
  entity.length > 0 ? Math.max(...entity.map((e) => e.id)) : 0;
