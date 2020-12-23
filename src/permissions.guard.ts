import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Observable} from 'rxjs'
import {Reflector} from '@nestjs/core'

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const routePermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        )

        const userContext = context.getArgs()[0]
        const userPermissions = userContext.user.permissions
        const audience = process.env.AUTH0_AUDIENCE
        const email = userContext.user[`${audience}/email`]
        const roles = userContext.user[`${audience}/roles`]

        console.log(`Route Permission: ${routePermissions}`)
        console.log(`User Permissions: ${userPermissions}`)
        console.log(`Email: ${email}`)
        console.log(`Roles: ${roles}`)

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
