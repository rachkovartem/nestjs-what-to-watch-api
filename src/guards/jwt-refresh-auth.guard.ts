import { ForbiddenException, Injectable } from '@nestjs/common';
import { getGuard } from '../utils/get-guard';

@Injectable()
export class JwtRefreshAuthGuard extends getGuard('jwt-refresh') {}
