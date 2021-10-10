import MainLayout from 'layouts'
import { Button, message } from 'antd'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { useGachaponContract, useCustomeContract } from 'hooks/useContract'
import { useERC20 } from 'hooks/useContract'
import { getMoonAddress } from 'utils/addressHelpers'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { ethers } from 'ethers'
import BigNumbers from 'bignumber.js'
import { ethersToSerializedBigNumber, ethersToBigNumber } from 'utils/bigNumber'
import { useState } from 'react'
import { maxWidth } from 'utils/breakpoint'

const Wrapper = styled('div')`
  width: 100%;
  height: 120vh;
  overflow-y: auto;
`

const Container = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  overflow: hidden;
`

const Wrap = styled('div')`
  padding-right: 2rem;
  padding-left: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
`

const GachaContainer = styled('div')`
  width: 1200px;
  height: 100%;
  margin: 80px 0 50px;
  display: flex;
  overflow: auto;
  justify-content: center;
  align-items: flex-start;
`

const GachaWrap = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 16px;
`

const GachaHeader = styled('div')`
  height: 5rem;
`


const GachaItem = styled('div')`
  display: flex;
  background: #f8f8fa;
  box-shadow: 0 4px 20px rgb(69 69 69 / 25%);
  border-radius: 16px;
  justify-content: center;
  margin: 2rem;
  min-width: 226px;
  min-height: 340px;
  max-width: 226px;
  max-height: 340px;
`

const GachaItemContent = styled('div')`
  background-image: url(/images/bg_normal_pack.svg);
  background-size: cover;
  display: flex;
  flex-direction: column;
  padding: 32px;
  align-content: center;
  width: 100%;
`

const GachaponModule = () => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const gachaponContract = useGachaponContract()
  const custumeContract = useCustomeContract()
  const moonTokenContract = useERC20(getMoonAddress())
  const [custome, setCustume] = useState(null)

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await moonTokenContract.allowance(account, gachaponContract.address)
          const currentAllowance = ethersToBigNumber(response)
          return currentAllowance.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        // 1000000000000000000000000
        return moonTokenContract.approve(gachaponContract.address, ethers.constants.MaxUint256)
      },
      onApproveSuccess: async () => {
        message.success('Contract approved')
      },
      onConfirm: async () => {
        return gachaponContract.purchaseTicket({ gasLimit: 300000 })
      },
      onSuccess: async (response) => {
        // spin winwheel
        const tokenIdBigNumber = new BigNumbers(response.events[3].args.tokenId.toString())
        const tokenId = ethersToSerializedBigNumber(tokenIdBigNumber)
        const appearanceOfBigNumber = await custumeContract.appearanceOf(tokenId)
        const appearanceOf = ethersToSerializedBigNumber(new BigNumbers(appearanceOfBigNumber.toString()))
        setCustume(appearanceOf)
        // return result
      },
      contract: moonTokenContract
    })

  return (
    <MainLayout>
      <Wrapper>
        <Container>
          <Wrap>
            <GachaContainer>
              <GachaWrap>
                {/* <GachaHeader>
                  <img src='/images/ic_header_pack.svg' style={{ height: '5rem' }} />
                </GachaHeader> */}
                {
                  custome ?
                    <img src={`/images/costumes/${custome}.png`} style={{ margin: '60px 0' }} />
                  :

                  <img src='/images/gachapon.png' width='400px' />
                  // <GachaItem>
                  //   <GachaItemContent>

                  //   </GachaItemContent>
                  // </GachaItem>

                }
                {
                  !account || !isApproved ?
                    <Button
                      style={{ width: '150px', marginTop: '30px' }}
                      size='large'
                      loading={isApproving || isConfirming}
                      onClick={() => {
                        if (account) {
                          if (isApproved) {
                            handleConfirm()
                          } else {
                            handleApprove()
                          }
                        } else {
                          login()
                        }
                      }}
                    >
                      {!account ? 'Connect Wallet' : isApproved ? 'purchase' : 'Enable'}
                    </Button>
                    :
                    <img src='/images/bt_gachapon.png' style={{ cursor: 'pointer', marginTop: '32px' }} onClick={() => handleConfirm()} width='200px' />
                }
              </GachaWrap>
            </GachaContainer>
          </Wrap>
        </Container>
      </Wrapper> 
    </MainLayout>
  )
}

export default GachaponModule
