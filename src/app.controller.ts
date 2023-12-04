import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  async healthCheckRoot() {
    const healthcheck = {
      uptime: process.uptime(),
      responsetime: process.hrtime(),
      message: "OK",
      timestamp: Date.now(),
    };

    return healthcheck;
  }

  @Get("/health")
  async healthCheck() {
    const healthcheck = {
      uptime: process.uptime(),
      responsetime: process.hrtime(),
      message: "OK",
      timestamp: Date.now(),
    };

    return healthcheck;
  }
}
