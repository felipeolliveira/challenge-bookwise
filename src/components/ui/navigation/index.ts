import { NavigationItem, NavigationItemProps } from './item'
import { NavigationList, NavigationListProps } from './list'
import { NavigationRoot, NavigationRootProps } from './root'

export const Navigation = {
  Root: NavigationRoot,
  List: NavigationList,
  Item: NavigationItem,
}

export type NavigationProps = {
  Root: NavigationRootProps
  List: NavigationListProps
  Item: NavigationItemProps
}
