import React from 'react'
import PanelBox from '../ui/PanelBox'

function PlayersPage() {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold italic font-sans mb-8">PLAYERS</h2>
        <div>
          <PanelBox>
            <img
              className="w-24 h-24 rounded-full mb-2 mx-auto"
              src="https://ca.slack-edge.com/T0257R0RP-U01Q8HYH5V5-04b052e801d6-512"
              alt="Lauren"
            />

            <div className="font-semibold text-lg text-center mb-2">
              Lauren Ferreira
            </div>

            <span className="text-gray-400 thin font-sans text-center">
              <div>1 arena win</div>
              <div>37 tower wins</div>
            </span>

            <span className="text-gray-400 thin font-sans mt-4 text-center">
              <div>X-Team</div>
            </span>
          </PanelBox>
        </div>

        <div className="mt-8">
          <PanelBox>
            <h3 className="text-gray-800 font-bold mb-4">Top Tower Players</h3>
            <div className="flex">
              <img
                className="w-10 h-10 rounded-full mb-4 inline-block mr-4"
                src="https://ca.slack-edge.com/T0257R0RP-U01Q8HYH5V5-04b052e801d6-512"
                alt="Lauren"
              />

              <span className="w-36 font-bold text-gray-800 flex flex-col items-center">
                <div>Lauren</div>
                <div className="font-thin text-gray-400 text-xs">
                  X-Team | Nightclaw
                </div>
              </span>

              <span className="w-36 font-bold text-gray-800 flex flex-col items-center">
                <div>37 wins</div>
                <div className="font-thin text-gray-400 text-xs">
                  106 losses
                </div>
              </span>

              <span className="w-36 font-bold text-gray-800 flex flex-col items-center">
                <div>12% wr</div>
                <div className="font-thin text-gray-400 text-xs">143 games</div>
              </span>
            </div>

            <div className="flex">
              <img
                className="w-10 h-10 rounded-full mb-4 inline-block mr-4"
                src="https://ca.slack-edge.com/T0257R0RP-UMF26ULH0-862d34507166-512"
                alt="Morten Barklund"
              />

              <span className="w-36 font-bold text-gray-800 flex flex-col items-center">
                <div>Morten Barklund</div>
                <div className="font-thin text-gray-400 text-xs">
                  X-Team | Corgi
                </div>
              </span>

              <span className="w-36 font-bold text-gray-800 flex flex-col items-center">
                <div>12 wins</div>
                <div className="font-thin text-gray-400 text-xs">50 losses</div>
              </span>

              <span className="w-36 font-bold text-gray-800 flex flex-col items-center">
                <div>7% wr</div>
                <div className="font-thin text-gray-400 text-xs">62 games</div>
              </span>
            </div>
          </PanelBox>
        </div>
      </div>
    </>
  )
}

export default PlayersPage
