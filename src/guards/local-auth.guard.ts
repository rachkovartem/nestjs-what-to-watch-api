import { Injectable } from '@nestjs/common';
import { getGuard } from '../utils/get-guard';

@Injectable()
export class LocalAuthGuard extends getGuard('local') {}
