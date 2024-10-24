import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import Swal from 'sweetalert2'

import { deleteEnemy, getEnemies } from '../api/admin'
import { emojiToImageTag } from '../helpers/emojiHelper'
import Button from '../ui/Button'

const ListEnemiesPage = () => {
  const [enemies, setEnemies] = useState<IEnemy[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sortedEnemies = enemies.sort(() => {
    return 0
  })

  useEffect(() => {
    fetchEnemies()
  }, [])

  async function fetchEnemies() {
    const enemies = await getEnemies()

    setEnemies(enemies)
  }

  const handleOnDeleteClick = (id?: number) => async () => {
    const swalResult = await Swal.fire({
      title: 'Delete it?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (!id || !swalResult.isConfirmed) {
      return
    }
    setIsLoading(true)
    await deleteEnemy(id)
    await fetchEnemies()
    setIsLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">ENEMIES</h2>

      <div className="mt-4">
        <a href="/enemies/new">
          <Button>New Enemy</Button>
        </a>
      </div>

      {isLoading ? (
        <SyncLoader />
      ) : (
        <div className="mt-4">
          {sortedEnemies.map((enemy: IEnemy, index) => (
            <span key={index}>
              <Link to={`/enemy/${enemy.id}`}>
                <div className="grid grid-cols-4 gap-4">
                  {emojiToImageTag(enemy.emoji, {}, 'h-12 w-12')}
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {enemy.name}{' '}
                      {enemy.isBoss ? (
                        <span className="text-red-700">(Boss)</span>
                      ) : null}
                    </span>
                    <span>{enemy._enemyPatternId}</span>
                  </div>
                  <div className="ml-16">
                    <div className="flex flex-col">
                      <span className="text-xs">Health</span>
                      <span className="text-xl">{enemy.health}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <span className="text-xs">Damage</span>
                      <span className="text-xl">
                        {enemy.minorDamageRate} ~ {enemy.majorDamageRate}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div>
                <button
                  onClick={handleOnDeleteClick(enemy.id)}
                  className="text-red-700"
                >
                  Delete
                </button>
              </div>
              <hr className="my-2" />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListEnemiesPage
