import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/model/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput, LoginUserInput, UserOutput } from './dtos/user.dto';
import { setRole } from 'src/auth/setRole.decotor';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  async createAccount(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<UserOutput> {
    return this.userService.createAccount(createUserInput);
  }

  @Mutation(() => UserOutput)
  async login(
    @Args('input') loginUserInput: LoginUserInput,
  ): Promise<UserOutput> {
    return this.userService.login(loginUserInput);
  }

  @setRole(['Any'])
  @Query(() => UserOutput)
  async me(@AuthUser() user: UserOutput) {
    return user;
  }
}
