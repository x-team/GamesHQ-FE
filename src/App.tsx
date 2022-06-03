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

import useCurrentUser from "./hooks/useCurrentUser";
import { SyncLoader } from "react-spinners";
import { XTEAM_ACCENT_COLOR } from "./helpers/colors";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppMenu } from "./AppMenu";

export const App = () => {
  const { authenticated, isAdmin, isDoingInitialLoading } = useCurrentUser();

  if (isDoingInitialLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <SyncLoader color={XTEAM_ACCENT_COLOR} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
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
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <ListGamesPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/new"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <GameEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/:gameTypeId"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <GameEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/players"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <PlayersPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspect/arena"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <InspectArenaPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tower/status"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <TowerGamePage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapons"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <ListWeaponsPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapons/new"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <WeaponEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapon/:weaponId"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <WeaponEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/zones"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <ListZonesPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/zones/new"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <ZoneEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/zone/:zoneId"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <ZoneEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enemies"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <ListEnemiesPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enemies/new"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <EnemyEditorPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enemy/:enemyId"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <EnemyEditorPage editMode={true} />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
              <AppMenu>
                <UnauthorizedPage />
              </AppMenu>
            </ProtectedRoute>
          }
        />
        <Route
          path="/floors"
          element={
            <ProtectedRoute authenticated={authenticated} isAdmin={isAdmin}>
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
