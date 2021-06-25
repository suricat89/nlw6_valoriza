import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {v4 as uuid} from 'uuid';
import Tag from '../tag/tag.model';
import User from '../user/user.model';

@Entity('compliments')
export default class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column({name: 'user_sender'})
  userSenderId: string;

  @JoinColumn({name: 'user_sender', referencedColumnName: 'id'})
  @ManyToOne(() => User)
  userSender: User;

  @Column({name: 'user_receiver'})
  userReceiverId: string;

  @JoinColumn({name: 'user_receiver', referencedColumnName: 'id'})
  @ManyToOne(() => User)
  userReceiver: User;

  @Column({name: 'tag_id'})
  tagId: string;

  @JoinColumn({name: 'tag_id', referencedColumnName: 'id'})
  @ManyToOne(() => Tag)
  tag: Tag;

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
