/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as MyEventsImport } from './routes/my-events'
import { Route as IndexImport } from './routes/index'
import { Route as EventsIndexImport } from './routes/events/index'
import { Route as EventsEventSlugIndexImport } from './routes/events/$eventSlug/index'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const MyEventsRoute = MyEventsImport.update({
  id: '/my-events',
  path: '/my-events',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const EventsIndexRoute = EventsIndexImport.update({
  id: '/events/',
  path: '/events/',
  getParentRoute: () => rootRoute,
} as any)

const EventsEventSlugIndexRoute = EventsEventSlugIndexImport.update({
  id: '/events/$eventSlug/',
  path: '/events/$eventSlug/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/my-events': {
      id: '/my-events'
      path: '/my-events'
      fullPath: '/my-events'
      preLoaderRoute: typeof MyEventsImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/events/': {
      id: '/events/'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsIndexImport
      parentRoute: typeof rootRoute
    }
    '/events/$eventSlug/': {
      id: '/events/$eventSlug/'
      path: '/events/$eventSlug'
      fullPath: '/events/$eventSlug'
      preLoaderRoute: typeof EventsEventSlugIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/my-events': typeof MyEventsRoute
  '/profile': typeof ProfileRoute
  '/events': typeof EventsIndexRoute
  '/events/$eventSlug': typeof EventsEventSlugIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/my-events': typeof MyEventsRoute
  '/profile': typeof ProfileRoute
  '/events': typeof EventsIndexRoute
  '/events/$eventSlug': typeof EventsEventSlugIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/my-events': typeof MyEventsRoute
  '/profile': typeof ProfileRoute
  '/events/': typeof EventsIndexRoute
  '/events/$eventSlug/': typeof EventsEventSlugIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/my-events' | '/profile' | '/events' | '/events/$eventSlug'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/my-events' | '/profile' | '/events' | '/events/$eventSlug'
  id:
    | '__root__'
    | '/'
    | '/my-events'
    | '/profile'
    | '/events/'
    | '/events/$eventSlug/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MyEventsRoute: typeof MyEventsRoute
  ProfileRoute: typeof ProfileRoute
  EventsIndexRoute: typeof EventsIndexRoute
  EventsEventSlugIndexRoute: typeof EventsEventSlugIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MyEventsRoute: MyEventsRoute,
  ProfileRoute: ProfileRoute,
  EventsIndexRoute: EventsIndexRoute,
  EventsEventSlugIndexRoute: EventsEventSlugIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/my-events",
        "/profile",
        "/events/",
        "/events/$eventSlug/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/my-events": {
      "filePath": "my-events.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/events/": {
      "filePath": "events/index.tsx"
    },
    "/events/$eventSlug/": {
      "filePath": "events/$eventSlug/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
