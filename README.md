## 프로젝트 개요
---
웹 퍼즐 게임 Wordle App(https://www.nytimes.com/games/wordle/index.html)의 클론 앱입니다.

### 시작
---
```
    npm start
```

### 플레이 방법
---
* 초기 화면
![image](https://user-images.githubusercontent.com/39260956/159024110-6171d07e-d9fc-491a-9ac9-e15e06520f1d.png)

- Wordle은 랜덤으로 지정된 5글자의 단어를 6번의 시도 안에 맞추는 게임입니다.
- 정답은 전부 실존하는 5글자의 단어로 입력해야 합니다.  
※ 길이가 부족하거나, 존재하지 않는 단어일 경우 정답으로 제출되지 않습니다!
- 키보드나 화면 하단의 키보드 버튼을 사용해서 정답을 입력하세요.  
 
![image](https://user-images.githubusercontent.com/39260956/159025100-ade3338f-4f3f-4b65-8b4d-fb5ed496f7be.png)

- 제출한 단어의 문자가 정답에 포함되어 있을 경우 노란색, 위치까지 일치할 경우 초록색, 존재하지 않을 경우 회색으로 표현됩니다.  

![image](https://user-images.githubusercontent.com/39260956/159025028-aac41611-0765-4875-bf83-7620a21bc53d.png)  
- 정답을 맞출 경우 친구들에게 결과를 공유할 수 있습니다.  
```  
Wordle 2022-03-18 23:48:02 3/6  
🟨🟨⬛⬛⬛  
⬛⬛⬛🟨🟨  
🟩🟩🟩🟩🟩  
⬜⬜⬜⬜⬜  
⬜⬜⬜⬜⬜  
⬜⬜⬜⬜⬜  
```  
![image](https://user-images.githubusercontent.com/39260956/159025580-8fdbce15-9435-43f2-a1c1-077cbd8806ce.png)  
- 6번의 시도 이내 맞추지 못할 경우 정답을 알려드립니다.
