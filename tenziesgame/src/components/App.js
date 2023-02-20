import {useState, useEffect} from 'react';
import Die from './Die';

export default function App() {
  const [nums, setNums] = useState([]);
  const [bools, setBools] = useState([[false, 0], [false, 1], [false, 2], [false, 3], [false, 4], [false, 5], [false, 6], [false, 7], [false, 8], [false, 9]]);
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      setNums(prev => [...prev, Math.ceil(Math.random() * 6)]);
    }
  }, []);
  useEffect(() => {
    if (bools.every(([bool]) => bool) && nums.every(val => val === nums[0])) {
      document.querySelector('audio').play();
    }
  });
  const roll = () => {
    const oldNums = nums;
    setNums([]);
    if (bools.every(([bool]) => bool) && nums.every(val => val === nums[0])) {
      setBools([[false, 0], [false, 1], [false, 2], [false, 3], [false, 4], [false, 5], [false, 6], [false, 7], [false, 8], [false, 9]]);
      for (let i = 0; i < 10; i++) {
        setNums(prev => [...prev, Math.ceil(Math.random() * 6)]);
      }
    } else {
      for (let i = 0; i < 10; i++) {
        if (bools[i][0] === true) {
          setNums(prev => [...prev, oldNums[i]]);
        } else {
          setNums(prev => [...prev, Math.ceil(Math.random() * 6)]);
        }
      }
    }
  }
  const handleClick = (id) => {
    setBools(prev => prev.map((bool, i) => {
      return id === bool[1] ? [!bool[0], i] : bool;
    }));
  }
  return (
    <div>
      <main>
        <div id='filler'>uewjofkansdlm</div>
        <h1>Tenzies</h1>
        <p id='description'>To play the game, click roll until all die values are equal. To freeze equal die values between rolls, click them.</p>
        <div id='dies'>
          {nums.map((num, i) => <Die val={num} bool={bools[i][0]} onClick={() => handleClick(i)}/>)}
        </div>
        <h2 onClick={roll}>{bools.every(([bool]) => bool && nums.every(val => val === nums[0])) ? 'Play again' : 'Roll'}</h2>
      </main>
    </div>
  );
}