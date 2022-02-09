import { Connection, getConnectionManager } from 'typeorm';
import { EntityConnectionError } from '../../errors';
import { Entity } from '../models/Entity';

export function getConnectionForEntity<T>(entity: Entity<T>): Connection {
  const connection = getConnectionManager().connections.find(
    (connection) => connection.getMetadata(entity).target == entity && connection.isConnected,
  );

  if (!connection) {
    throw new EntityConnectionError(entity);
  }

  return connection;
}
