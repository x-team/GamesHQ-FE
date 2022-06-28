import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlayersPage from "./pages/PlayersPage";
import InspectArenaPage from "./pages/InspectArenaPage";
import ListWeaponsPage from "./pages/ListWeaponsPage";
import WeaponEditorPage from "./pages/WeaponEditorPage";
import ListZonesPage from "./pages/ListZonesPage";
import ListGamesPage from "./pages/ListGamesPage";
import ZoneEditorPage from "./pages/ZoneEditorPage";
import GameEditorPage from "./pages/GameEditorPage";
import ListEnemiesPage from "./pages/ListEnemiesPage";
import EnemyEditorPage from "./pages/EnemyEditorPage";
import NotFoundPage from "./pages/NotFoundPage";
import TowerGamePage from "./pages/TowerGamePage";
import FloorsEditorPage from "./pages/FloorsEditorPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";

// import useCurrentUser from "./hooks/useCurrentUser";
// import { SyncLoader } from "react-spinners";
// import { XTEAM_ACCENT_COLOR } from "./helpers/colors";
// import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppMenu } from "./AppMenu";
import AchievementsPage from "./pages/AchievementsPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";

export const App = () => {
  // if (isDoingInitialLoading) {
  //   return (
  //     <div className="h-screen w-screen flex justify-center items-center">
  //       <SyncLoader color={XTEAM_ACCENT_COLOR} />
  //     </div>
  //   );
  // }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppMenu>
                <HomePage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<SignInPage />} />
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <AppMenu>
                <ListGamesPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/new"
          element={
            <ProtectedRoute>
              <AppMenu>
                <GameEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/achievements/:achievementId"
          element={
            <ProtectedRoute>
              <AppMenu>
                <AchievementsPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/leaderboards/:leaderboardId"
          element={
            <ProtectedRoute>
              <AppMenu>
                <LeaderboardsPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/:gameTypeId"
          element={
            <ProtectedRoute>
              <AppMenu>
                <GameEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <AppMenu>
                <PlayersPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspect/arena"
          element={
            <ProtectedRoute>
              <AppMenu>
                <InspectArenaPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tower/status"
          element={
            <ProtectedRoute>
              <AppMenu>
                <TowerGamePage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapons"
          element={
            <ProtectedRoute>
              <AppMenu>
                <ListWeaponsPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapons/new"
          element={
            <ProtectedRoute>
              <AppMenu>
                <WeaponEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapons/:weaponId"
          element={
            <ProtectedRoute>
              <AppMenu>
                <WeaponEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/zones"
          element={
            <ProtectedRoute>
              <AppMenu>
                <ListZonesPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/zones/new"
          element={
            <ProtectedRoute>
              <AppMenu>
                <ZoneEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/zone/:zoneId"
          element={
            <ProtectedRoute>
              <AppMenu>
                <ZoneEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enemies"
          element={
            <ProtectedRoute>
              <AppMenu>
                <ListEnemiesPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enemies/new"
          element={
            <ProtectedRoute>
              <AppMenu>
                <EnemyEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enemy/:enemyId"
          element={
            <ProtectedRoute>
              <AppMenu>
                <EnemyEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/floors"
          element={
            <ProtectedRoute>
              <AppMenu>
                <FloorsEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
