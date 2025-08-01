import React from 'react'
import { defaultActionButtons, useMainAction, type MenuItem } from './hooks'
import './index.css'

interface ActionButton {
  id: string
  text: string
  variant: 'primary' | 'secondary' | 'outline'
  selected?: boolean
}

interface MainActionProps {
  actionId: string
  handleActionClick: (action: ActionButton | MenuItem) => void
}

const MainAction: React.FC = () => {
  const {
    firstAction,
    setFirstAction,
    actionId,
    handleActionClick,
    containerRef,
    showSecondAction,
    setShowSecondAction,
  } = useMainAction()

  return (
    <div className="action-buttons-section">
      <div className="action-buttons-wrapper">
        {defaultActionButtons.map((button) => {
          return (
            <div
              key={button.id}
              className={`action-btn action-btn-${button.variant}`}
              onClick={() => {
                setFirstAction(button.id)
                if (button.list && button.list.length > 0) {
                  setShowSecondAction(true)
                } else {
                  handleActionClick(button)
                  setShowSecondAction(false)
                }
              }}
            >
              {<div className="query-icon" />}
              <span className="action-btn-text">{button.text}</span>
              {firstAction === button.id && button.list && showSecondAction && (
                <div className="sub-menu" ref={containerRef}>
                  <ul className="sub-menu-list" >
                    {button.list.map((item) => (
                      <li
                        key={item.id}
                        className={`sub-menu-item`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleActionClick(item)
                          setShowSecondAction(false)
                        }}
                      >
                        <div>{item.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MainAction
