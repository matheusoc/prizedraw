import { useRef, useState } from 'react'
import styled from 'styled-components'

import './App.css'

const RandomNumber = styled.div`
  font-size: 150px;
  color: #fff;
` 

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  height: 100%;
`

const SortedNumbersContainer = styled.div`
  color: #fff;
`

const SortedNumbers = styled.div`
  height: 72px;
`

const MaxContainer = styled.div`
  display: flex;
  justify-content: center;
`
const MaxLabel = styled.p`
  color: #fff;
`
const MaxInput = styled.div`
  input {
    all: unset;
    color: #fff;
    background-color: #70b3ff;
    width: 40px;
  }
  margin: auto 20px;
`

function App() {
  const [maxNumber, setMaxNumber] = useState(250)
  const [numbers, addNumber] = useState<Array<number>>([])
  const [count, setCount] = useState(0)
  const [sorting, setSorting] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0)
  
  const countRef = useRef(count);
  countRef.current = count;

  const randomNumberRef = useRef(randomNumber)
  randomNumberRef.current = randomNumber

  const timeout = () => {
    setTimeout(() => {
      setCount(countRef.current + 1)
      if (countRef.current < 10) {
        random()
        timeout()
      } else {
        setSorting(false)
        addNumber([...numbers, randomNumberRef.current])
      }
    }, 50)
  }

  const random = () => {
    const number = Math.floor(Math.random() * maxNumber)
    setRandomNumber(number + 1)
  }

  const startRandom = () => {
    setCount(0)
    setSorting(true)
    timeout()
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Space' && !sorting) {
      startRandom()
    }
  };

  const onChangeMaxNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (value >= 0 && value <= 999)
      setMaxNumber(value)
  }

  return (
    <Container onKeyUp={onKeyUp} tabIndex={0}>
      <MaxContainer> 
        <MaxLabel>Número máximo</MaxLabel>
        <MaxInput>
          <input value={maxNumber} onChange={onChangeMaxNumber}/>
        </MaxInput> 
      </MaxContainer>
      <RandomNumber>
        {randomNumber}
      </RandomNumber>
      <SortedNumbersContainer>
        <div>
          Números sorteados
        </div>
        <SortedNumbers>{numbers.join(', ')}</SortedNumbers>
      </SortedNumbersContainer>
    </Container>
  )
}

export default App
