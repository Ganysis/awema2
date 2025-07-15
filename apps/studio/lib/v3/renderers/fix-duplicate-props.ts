/**
 * Utilitaire pour éviter la duplication des propriétés dans les renderers V3
 */

import { BlockProp } from '@awema/shared';

/**
 * Filtre les propriétés pour éviter les doublons
 * @param baseProps - Propriétés de base
 * @param propsToRemove - Noms des propriétés à supprimer
 * @returns Propriétés filtrées
 */
export function filterDuplicateProps(
  baseProps: BlockProp[], 
  propsToRemove: string[]
): BlockProp[] {
  return baseProps.filter(prop => !propsToRemove.includes(prop.name));
}

/**
 * Merge les propriétés en évitant les doublons
 * @param baseProps - Propriétés de base
 * @param newProps - Nouvelles propriétés à ajouter
 * @returns Propriétés mergées sans doublons
 */
export function mergeProps(
  baseProps: BlockProp[], 
  newProps: BlockProp[]
): BlockProp[] {
  const propNames = new Set(newProps.map(p => p.name));
  const filteredBase = baseProps.filter(prop => !propNames.has(prop.name));
  return [...newProps, ...filteredBase];
}