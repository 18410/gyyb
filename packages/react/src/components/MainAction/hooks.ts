import { useState, useEffect, useRef } from 'react'

/**
 * 主功能按钮的菜单项类型
 */
interface ActionButton {
  id: string
  text: string
  variant: 'primary' | 'secondary' | 'outline'
  selected?: boolean
  list?: MenuItem[] // 可选的子菜单项
}

export interface MenuItem {
  id: string
  type: 'header' | 'item'
  text: string
  icon?: string
  selected?: boolean
  description?: string
}

const defaultActionButtons: ActionButton[] = [
  {
    id: 'weekly-write',
    text: '周报撰写',
    variant: 'outline',
    selected: false,
    list: [],
  },
  {
    id: 'work-review',
    text: '工作回顾',
    variant: 'outline',
    selected: false,
    list: [
      {
        id: 'feishu',
        type: 'item',
        text: '飞书回顾',
      },
      {
        id: 'jira',
        type: 'item',
        text: 'Jira日志回顾',
      },
    ],
  },
  {
    id: 'weekly-summary',
    text: '周报总结',
    variant: 'outline',
    selected: false,
    list: [
      {
        id: 'project',
        type: 'item',
        text: '项目/任务维度总结',
      },
      {
        id: 'myWeekly',
        type: 'item',
        text: '总结我的周报',
      },
      {
        id: 'teamWeekly',
        type: 'item',
        text: '总结团队周报',
      },
    ],
  },
]

/**
 * 选择主功能按钮
 * @returns
 */
const useMainAction = () => {
  const [actionId, setActionId] = useState('')
  const [showSecondAction, setShowSecondAction] = useState(false)
  const [firstAction, setFirstAction] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 监听点击外部区域，隐藏二级菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setShowSecondAction(false)
        }, 100)
      }
    }

    if (firstAction) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [firstAction])

  const handleActionClick = (item: ActionButton | MenuItem): void => {
    // debugger
    const selectedId =
      isActionButton(item) && item.list
        ? item.id
        : firstAction + ':' + item.id
    setActionId(selectedId)
    console.log(selectedId)
  }

  function isActionButton(item: ActionButton | MenuItem): item is ActionButton {
    return (item as ActionButton).list !== undefined
  }

  return {
    actionId,
    setActionId,
    firstAction,
    setFirstAction,
    handleActionClick,
    containerRef,
    showSecondAction,
    setShowSecondAction,
  }
}

export { useMainAction, defaultActionButtons }
