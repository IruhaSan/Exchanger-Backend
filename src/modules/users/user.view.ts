import { classToPlain, instanceToPlain } from 'class-transformer';
import { UserEntity } from './entity/users.entity';

export type UserView = Omit<UserEntity, 'password'>;

export class User {
  constructor(private data: UserEntity) {}

  getView(): UserView {
    const data = {
      ...this.data,
    };

    delete data.password;

    return <UserView>data;
  }
}
