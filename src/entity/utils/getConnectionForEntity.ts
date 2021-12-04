import { Connection, getConnectionManager } from 'typeorm';
import { EntityConnectionError } from '../../errors';
import { Entity } from '../models/Entity';

export function getConnectionForEntity<T>(entity: Entity<T>): Connection {
  const connection = getConnectionManager().connections.find((connection) => {
    try {
      return connection.getMetadata(entity).target == entity && connection.isConnected;
    } catch (error) {
      return undefined;
    }
  });

  if (!connection) {
    throw new EntityConnectionError(entity);
  }

  return connection;
}
