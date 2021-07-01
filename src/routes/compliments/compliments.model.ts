import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {v4 as uuid} from 'uuid';
import {TagModel} from '../tag/tag.model';
import {UserModel} from '../user/user.model';

@Entity('compliments')
export class ComplimentModel {
  @PrimaryColumn()
  readonly id: string;

  @Column({name: 'user_sender'})
  userSenderId: string;

  @JoinColumn({name: 'user_sender', referencedColumnName: 'id'})
  @ManyToOne(() => UserModel)
  userSender: UserModel;

  @Column({name: 'user_receiver'})
  userReceiverId: string;

  @JoinColumn({name: 'user_receiver', referencedColumnName: 'id'})
  @ManyToOne(() => UserModel)
  userReceiver: UserModel;

  @Column({name: 'tag_id'})
  tagId: string;

  @JoinColumn({name: 'tag_id', referencedColumnName: 'id'})
  @ManyToOne(() => TagModel)
  tag: TagModel;

  @Column()
  message: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
