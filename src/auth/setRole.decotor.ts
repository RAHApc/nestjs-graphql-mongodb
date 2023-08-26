import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/model/enums/user-role.enum';

export type AllowedRoles = keyof typeof Role | 'Any';
export const setRole = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
