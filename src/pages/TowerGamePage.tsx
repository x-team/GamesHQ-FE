import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import {
  createTowerGame,
  endCurrentTowerGame,
  getCurrentTowerGameStatus,
  openOrCloseCurrentTowerGame
} from '../api/admin'
import Button from '../ui/Button'
import PanelBox from '../ui/PanelBox'
import TextInput from '../ui/TextInput'

interface IForm {
  name: string
  height: number
}

const TowerGamePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentTowerGame, setCurrentTowerGame] =
    useState<IGameWithTower | null>(null)
  // const navigate = useNavigate();

  const initialValues: IForm = {
    name: '',
    height: 10
  }

  const onSubmit = async (values: IForm) => {
    setIsLoading(true)
    await createTowerGame({
      name: values.name,
      height: values.height
    })
    // history.go(0);
  }

  const handleEndGameButtonClick = async () => {
    const swalResult = await Swal.fire({
      title: 'Are you sure you want to end the current tower game?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, end it!'
    })
    if (!swalResult.isConfirmed) {
      return
    }
    setIsLoading(true)
    await endCurrentTowerGame()
    // history.go(0);
  }

  const handleOpenTowerButtonClick = async () => {
    const swalResult = await Swal.fire({
      title: 'Open the tower to the people?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, open the tower!'
    })
    if (!swalResult.isConfirmed) {
      return
    }
    setIsLoading(true)
    await openOrCloseCurrentTowerGame(true)
    // history.go(0);
  }

  const handleCloseTowerButtonClick = async () => {
    const swalResult = await Swal.fire({
      title: 'Close the tower to the people?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, CLOSE the tower!'
    })
    if (!swalResult.isConfirmed) {
      return
    }
    setIsLoading(true)
    await openOrCloseCurrentTowerGame(false)
    // history.go(0);
  }

  const validationSchema = Yup.object({
    name: Yup.string().max(30).required().label('Name'),
    height: Yup.number().min(1).required().label('Height (floors)')
  })

  const { getFieldProps, getFieldMeta, handleSubmit, dirty, isValid } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema
    })

  useEffect(() => {
    const fetchCurrentTowerGame = async () => {
      setIsLoading(true)
      const towerGame = await getCurrentTowerGameStatus()
      setCurrentTowerGame(towerGame)
      setIsLoading(false)
    }

    fetchCurrentTowerGame()
  }, [setCurrentTowerGame])

  const renderCurrentTowerGame = () => {
    if (!currentTowerGame) {
      return (
        <div>
          <span className="italic">
            No active tower game at the moment. Create one below.
          </span>
          <hr className="my-4" />
        </div>
      )
    }

    return (
      <div>
        <h3 className="text-xl font-bold italic font-sans mb-4">
          Active Tower: {currentTowerGame.name}
        </h3>
        <PanelBox>
          {currentTowerGame._tower.isOpen ? (
            <span className="text-green-500">TOWER IS OPEN</span>
          ) : (
            <span className="text-red-500">TOWER IS CLOSED</span>
          )}

          <div className="flex gap-12 mt-4 w-80">
            <section>
              <strong>Prizes</strong>
              <div>
                <span>LunaIcon</span>{' '}
                <span>{currentTowerGame._tower.lunaPrize}</span>
              </div>
              <div>
                <span>CoinIcon</span>{' '}
                <span>{currentTowerGame._tower.coinPrize}</span>
              </div>
            </section>

            <section>
              <strong>Height</strong>
              <div>{currentTowerGame._tower.height}</div>
            </section>
          </div>
        </PanelBox>

        <div className="my-2">
          {!currentTowerGame._tower.isOpen && (
            <Button type="button" onClick={handleOpenTowerButtonClick}>
              Open the Tower!
            </Button>
          )}
          {currentTowerGame._tower.isOpen && (
            <Button type="button" onClick={handleCloseTowerButtonClick}>
              Close the Tower!
            </Button>
          )}
        </div>

        <div className="mt-2">
          Why don&apos;t you add some floors at the{' '}
          <Link to="/floors" className="text-xteamaccent italic">
            Floors
          </Link>{' '}
          page?
        </div>

        <hr className="my-4" />

        <Button type="button" onClick={handleEndGameButtonClick}>
          End Game
        </Button>
      </div>
    )
  }

  const renderNewTowerGameForm = () => {
    if (currentTowerGame) {
      return
    }
    const isSubmitDisabled = !isValid || !dirty

    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold italic font-sans mb-4">
          Create New Tower Game
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <TextInput
              label="Name"
              {...getFieldProps('name')}
              {...getFieldMeta('name')}
            />

            <TextInput
              label="Height (number of floors)"
              {...getFieldProps('height')}
              {...getFieldMeta('height')}
              type="number"
            />
          </div>
          <div className="mt-8">
            <Button disabled={isSubmitDisabled} type="submit">
              Create New Tower Game
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">TOWER GAME</h2>

      {isLoading ? (
        <SyncLoader />
      ) : (
        <div>
          <div>{renderCurrentTowerGame()}</div>
          <div>{renderNewTowerGameForm()}</div>
        </div>
      )}
    </div>
  )
}

export default TowerGamePage
