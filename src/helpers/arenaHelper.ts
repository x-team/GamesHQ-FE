export enum ARENA_SLACK_COMMANDS {
  // ADMIN COMMANDS
  NEW_GAME = '/arena-newgame',
  END_GAME = '/arena-endgame',
  MAKE_ALL_VISIBLE = '/arena-makeallvisible',
  GIVE_EVERYONE_WEAPON = '/arena-giveweapons',
  ADD_PLAYER = '/arena-addplayer',
  ADD_SPECTATOR = '/arena-addspectator',
  START_ROUND = '/arena-startround',
  LIST_PLAYERS = '/arena-listplayers',
  LIST_SPECTATORS = '/arena-listspectators',
  LIST_IDLE = '/arena-listidle',
  ADD_BOSS = '/arena-addboss',
  ADD_GUEST = '/arena-addguest',
  REVIVE_BOSS = '/ta-reviveboss',
  PERFORMANCE = '/arena-performance',
  // WEAPONS
  NARROW_WEAPONS = '/arena-narrowweapons',
  // ZONES
  CREATE_ZONE = '/arena-create-zone',
  UPDATE_ZONE = '/arena-update-zones',
  NARROW_ZONES = '/arena-narrow-zones',
  ENABLE_ZONE_DEACTIVATION = '/arena-zonedeactivation-on',
  DISABLE_ZONE_DEACTIVATION = '/arena-zonedeactivation-off',
  // PLAYER COMMANDS
  ACTIONS = '/arena',
  STATUS = 'arena-status',
  HIDE = 'arena-hide',
  SEARCH_HEALTH = 'arena-searchforhealth',
  SEARCH_WEAPONS = 'arena-searchforweapons',
  SEARCH_ARMOR = 'arena-searchforarmors',
  HEAL_OR_REVIVE_OTHER = 'arena-reviveother',
  HEAL_OR_REVIVE_SELF = 'arena-reviveself',
  HUNT = 'arena-hunt',
  CHEER = 'arena-cheer',
  REPEAT_LAST_CHEER = 'arena-repeatlastcheer',
  CHANGE_LOCATION = 'arena-change-location',
}

