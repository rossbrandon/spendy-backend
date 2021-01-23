import { CanActivate, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

@Injectable()
export class GqlPermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: GqlExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const routePermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        )

        const ctx = GqlExecutionContext.create(context)
        const userPermissions = ctx.getContext().req.user.permissions

        if (!routePermissions) {
            return true
        }

        const hasPermission = () =>
            routePermissions.every(routePermission =>
                userPermissions.includes(routePermission),
            )

        return hasPermission()
    }
}
