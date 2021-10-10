import { useEffect, useReducer, useRef } from 'react'
import { noop } from 'lodash'
import { message } from 'antd'
import { useWeb3React } from '@web3-react/core'

const initialState = {
  approvalState: 'idle',
  confirmState: 'idle'
}

const reducer = (state, actions) => {
  switch (actions.type) {
    case 'requires_approval':
      return {
        ...state,
        approvalState: 'success'
      }
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading'
      }
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success'
      }
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail'
      }
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading'
      }
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success'
      }
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail'
      }
    default:
      return state
  }
}

const useApproveConfirmTransaction = ({
  onApprove,
  onConfirm,
  onRequiresApproval,
  onSuccess = noop,
  onApproveSuccess = noop,
  contract
}) => {
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const handlePreApprove = async () => {
      const result = await onRequiresApproval()
      if (result) {
        dispatch({ type: 'requires_approval' })
      }
    }
    if (account && contract) {
      handlePreApprove()
    }
  }, [account, dispatch, contract])

  return {
    isApproving: state.approvalState === 'loading',
    isApproved: state.approvalState === 'success',
    isConfirming: state.confirmState === 'loading',
    isConfirmed: state.confirmState === 'success',
    handleApprove: async () => {
      try {
        const tx = await onApprove()
        dispatch({ type: 'approve_sending' })
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'approve_receipt' })
          onApproveSuccess(state)
        }
      } catch (error) {
        dispatch({ type: 'approve_error' })
        message.error('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      }
    },
    handleConfirm: async () => {
      dispatch({ type: 'confirm_sending' })
      try {
        const tx = await onConfirm()
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'confirm_receipt' })
          onSuccess(receipt)
        }
      } catch (error) {
        dispatch({ type: 'confirm_error' })
        message.error('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      }
    },
  }
}

export default useApproveConfirmTransaction
