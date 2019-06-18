import React from 'react'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

function CourseQandA() {
  return (
    <>
      <Container fluid style={{fontSize: '1.2rem'}}>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Q1. 請問該如何分享滾滾傘才能得到│小樹餐具套│呢？
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                a.請到【小意思
                SoEasy】粉絲團的置頂貼文留言處，標註【二位以上的朋友】，並公開分享該篇貼文。
                <br />
                b.
                前往贊助記錄，點擊【修改／查看記錄】，然後在【備注回饋細節】欄填寫已分享的朋友即可。
                完成以上步驟就能獲贈│小樹餐具套│囉 : )
                【粉絲團的置頂貼文】連結：http://bit.ly/置頂貼文
                <br />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Q2. 滾滾傘可以遮陽抗UV嗎?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                晴天&雨天都沒問題。
                <br />
                滾滾傘採用了PG布料，PG布料質地厚實且密度也較高、而布料的【厚度／密度／顏色】也是抗UV係數的重要參數，因此PG布能同時兼具防撥水與抗UV的雙重效果，是一種全天候都適用的布料材質。滾爸以下另外提供它款同質布料的SGS檢測參數提供贊助者參考:
                <br />
                │撥水等級5 │遮光率97.33% │UPF25 B │UPF值 27 │UVA透過率 8.94%
                │UVB透過率 2.74%
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Q3. 為什麼滾滾傘不是自動傘?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                滾滾傘是標準三折式手開折疊傘。
                其實最初手作版的設計雖然是自動傘，但滾爸基於攜帶重量與穩定性的考量；最後決定採用標準三折傘的規格。
                <br />
                雖然有些自動傘也能有很不錯的構成、但論永續與穩定性；仍然是標準三折傘的表現比較優異。
                <br />
                然而相較於相同規格的傘，折疊傘更是能比自動傘輕量化達到30-50%，這對於時常需要攜帶雨傘的台灣氣候來說；是較能減輕體感上的相當負擔。
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              Q4. 滾滾傘防風嗎？
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                滾滾傘是抗風防風的。
                <br />
                滾滾傘的傘骨採用了高韌性FRP(玻璃纖維)+鋁合金，主要骨幹採用多邊12角切割的抗折工法構成；這些都讓滾滾傘具備了標準防風的體質。
                <br />
                那麼到底能抗幾級風？
                <br />
                這個問題其實很難有明確的答案，由於風在實驗室之外的環境是呈現非線性的，因此折疊傘的抗風級數會出現較大的極端值，參數的參考價值會變得相當有限。
                <br />
                但有個答案很明確，颱風或颶風天，全世界不論什麼樣的折疊傘，滾爸都非常不建議使用
                <br />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    </>
  )
}

export default CourseQandA
