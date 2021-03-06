# 제품 설명서
**체육 수업 온라인, 체온 (pe-assistant)** 사용을 위한 제품 설명서입니다.  

세계적으로 지속되는 디지털화 속에, COVID-19 사태까지 발생하며, 온라인 수업은 계속 확대되고 있습니다. 하지만 이 속에서 체육 수업은 제대로 이루어지지 않고 있습니다. 원격으로 학생들의 운동을 관리하기가 어려워, 이론 설명 위주의 수업만 진행되고 있는 것입니다.  

본 제품은 이런 문제를 개선하기 위해 만들어졌습니다. 체온을 통하면

- 학생의 동작을 인식하여 운동 수행 여부를 확인하고
- 운동 동작의 정확성을 확인하며
- 출석과 과제 진행 상황을 확인하는 등 학생 관리가 용이해집니다.

이와 같은 기능을 사용하고 싶으시면, 아래의 설명에 따라 제품을 사용해보시길 바랍니다.

> 아래 사이트를 접속하시면, 본 제품을 확인하실 수 있습니다.  
https://pe-assistant.vercel.app/

본 제품은 학생과 교사로 나누어 사용할 수 있습니다. 교사 화면을 확인하고 싶으신 분은 **A. 교사 사용법**을, 학생 화면을 확인하시고 싶으신 분은 **B. 학생 사용법**을 참고하시길 바랍니다.

## A. 교사 사용법

### 1) 교사 로그인하기
로그인 화면에서 **선생님이신가요?** 버튼을 누르고, 아이디와 비밀번호를 입력합니다.

<img src="https://user-images.githubusercontent.com/49065638/145055030-f949fbc5-4552-4960-8236-ee2c6971139b.png">
임시로 아래와 같은 아이디와 비밀번호로 실행해보실 수 있습니다.

```
아이디 : teacher1
비밀번호 : temp
```

로그인을 마치면 아래와 같이 학생 목록을 확인할 수 있습니다.
<img src="https://user-images.githubusercontent.com/49065638/145056754-d0385c54-d960-4f8b-a942-b4b00595ab4d.png">

### 2) 과제 추가하기
교사로서 담당 학생들에게 과제를 내고 싶으면, 왼쪽 상단의 버튼을 눌러 메뉴를 열면 아래와 같은 화면이 나타납니다.
<img src="https://user-images.githubusercontent.com/49065638/145057335-2040e5fe-c3dc-47c4-8d55-82a10fca0821.png">
여기서 **과제 추가**를 선택합니다.

<img src="https://user-images.githubusercontent.com/49065638/145058900-26b3eb01-70e0-4fe1-acba-acf2bad87174.png"/>

이후 원하는 과제를 설정해줍니다.
- 제목 : 텍스트를 입력합니다.
- 설명 : 텍스트를 입력합니다.
- 마감기한 : 오른쪽의 달력 그림을 눌러 날짜를 선택합니다.
- 운동 선택 : 각 동작들의 운동그림, 제목, 설명을 보고, 원하는 운동을 차례로 마우스로 선택합니다.

위 과정을 마친 후 **과제 추가** 버튼을 누르면, 새로운 과제 생성이 완료됩니다.

### 3) 과제 진행 확인
추가한 과제에 대한 학생 수행 여부는 다시 왼쪽 외의 메뉴 버튼을 누른 후, **과제 성취도 확인**을 누르면 확인할 수 있습니다.
<img src="https://user-images.githubusercontent.com/49065638/145057335-2040e5fe-c3dc-47c4-8d55-82a10fca0821.png">

아래와 같은 화면에서 **과제를 선택하세요** 라고 적힌 드롭다운 버튼을 눌러 원하는 과제를 선택합니다. 학생별로 **완료** 혹은 **미완료**로 과제 수행 여부가 표시됩니다.
<img src="https://user-images.githubusercontent.com/49065638/145060181-b21410ae-9b95-4075-a490-7dbf3a38b468.png"> 

## B. 학생 사용법

### 1) 학생 로그인
로그인 화면에서 **선생님이신가요?** 버튼을 누르지 **않고** 아이디와 비밀번호를 입력합니다.
![image](https://user-images.githubusercontent.com/49065638/145060684-65ac882c-67ea-4a40-ab73-5f1e69547eb8.png)

임시로 아래와 같은 아이디와 비밀번호로 실행해보실 수 있습니다.

```
아이디 : student1
비밀번호 : temp
```

로그인이 성공하면, 아래와 같이 지정된 과제들을 확인할 수 있습니다.
![image](https://user-images.githubusercontent.com/49065638/145061930-fe9dfc9d-d9da-455e-81f0-9eb70bebb3c9.png)


### 2) 과제 수행하기

화면에 나타나는 과제 중, 푸른 빛을 띄는 과제는 현재 진행 중인 과제이며, 나머지는 기한이 지난 과제입니다. 따라서 진행 중인 과제를 선택해줍니다.
![image](https://user-images.githubusercontent.com/49065638/145062614-0ecdaa10-e799-45c4-a0dc-fcae349723ac.png)

위와 같이 왼쪽엔 동작 설명, 오른쪽엔 사용자의 모습이 나타나게 됩니다.  
- 이때 **설명과 같은 동작을 수행합니다.**  

그러면 동작인식 인공지능이 사용자의 신체 중 중심 포인트들을 인식하여, 사용자의 동작을 확인합니다. 맞게 동작을 수행한다면, **동작 수행 횟수** 부분에 숫자가 1씩 늘어납니다.

숫자가 목표 횟수에 도달하면 다음 동작 버튼이 활성화됩니다. 
- **다음 동작** 버튼을 누르고,
- 같은 방식으로 운동들을 모두 수행합니다.

운동을 모두 수행하고 나면, 제출하기 버튼이 활성화됩니다. 그러면
- **제출하기** 버튼을 누릅니다.
