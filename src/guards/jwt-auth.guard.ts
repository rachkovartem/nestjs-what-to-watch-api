import { Injectable } from '@nestjs/common';
import { getGuard } from '../utils/get-guard';

@Injectable()
export class JwtAuthGuard extends getGuard('jwt') {}
