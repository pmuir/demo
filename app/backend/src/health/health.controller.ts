import {Controller, Get} from '@nestjs/common';
import {HealthCheck, HealthCheckService, TypeOrmHealthIndicator} from "@nestjs/terminus";
import {Resource, Unprotected} from "nest-keycloak-connect";

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    @Unprotected()
    readiness() {
        return this.health.check([
            async () => this.db.pingCheck('database', { timeout: 300 }),
        ]);
    }
}
