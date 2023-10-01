/*
 * Copyright (c) 2023 DevRev, Inc. All rights reserved.
 */

import coontact from './functions/coontact/index';
import Coll_or_msg from './functions/Coll_or_msg/index';

export const functionFactory = {
  coontact,
  Coll_or_msg,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
