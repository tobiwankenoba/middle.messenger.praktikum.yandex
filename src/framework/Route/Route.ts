import { render } from '../../utils/render';
import { Block } from '../Block';

export interface IBlockClassInterface {
  new (props: StringIndexed): Block<StringIndexed>;
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export class Route {
  private block: Nullable<Block<StringIndexed>> = null;

  private _pathname: string;

  private readonly _blockClass: IBlockClassInterface;

  private readonly _root: string;

  constructor(pathname: string, view: IBlockClassInterface, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._root = rootQuery;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this._blockClass({});
    }
    render(this._root, this.block as Block<StringIndexed>);
  }
}
