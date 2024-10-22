import { IBlockClassInterface, Route } from "../Route";
import AuthController from "../../controllers/AuthController";
import { store } from "../Store";

export type Nullable<T> = T | null | {};

class Router {
  private routes: Route[] = [];

  private currentRoute: Nullable<Route> = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    this.routes = [];
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      (this.currentRoute as Route).leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public use(pathname: string, block: IBlockClassInterface) {
    const route = new Route(pathname, block, this.rootQuery);

    this.routes.push(route);

    return this;
  }

  public async start() {
    store.resetError();

    window.onpopstate = async (event: PopStateEvent) => {
      const target = event.currentTarget;

      if (target instanceof Window) {
        this._onRoute(target.location.pathname);
      }
    };

    await AuthController.getUser();

    if (store.getState().error) {
      this.go("/");
    }

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router("#app");
