import { observable } from 'mobx';
import { toggle } from '../../../utils/decorators';

@toggle('open', 'isOpen')
export default class PostCreateModal {

  @observable isOpen = false;
}
