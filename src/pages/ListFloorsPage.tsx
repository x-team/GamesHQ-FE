import React from 'react'

import Button from '../ui/Button'

const ListFloorsPage = function ListFloorsPage() {
  const sortedEnemies = [].sort(() => {
    return 0
  })

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">ENEMIES</h2>

      <div className="mt-4">
        <a href="/enemies/new">
          <Button>New Floor</Button>
        </a>
      </div>

      <div className="mt-4">
        {sortedEnemies.map((_, index) => (
          <span key={index}>
            <hr className="my-2" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default ListFloorsPage
