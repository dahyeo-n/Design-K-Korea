const PrivacyPolicy = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#212529]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10">개인정보처리방침</h1>
      <p className="mb-10 text-sm sm:text-base leading-relaxed">
        &quot;디자인케이코리아&quot;(이하 &apos;회사&apos;라 한다)는 개인정보
        보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을
        신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
        처리지침을 수립, 공개합니다.
      </p>

      <div className="space-y-10 leading-relaxed text-sm sm:text-base">
        <section>
          <h2 className="text-lg font-semibold mb-2">
            제1조 (개인정보의 처리목적)
          </h2>
          <p className="mb-3">
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등
            필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-decimal pl-6 space-y-1">
            <li>
              홈페이지 회원 가입 및 관리
              <p>
                회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증,
                회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인,
                서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보처리 시
                법정대리인의 동의 여부 확인, 각종 고지․통지, 고충 처리 등을
                목적으로 개인정보를 처리합니다.
              </p>
            </li>
            <li>
              재화 또는 서비스 제공
              <p>
                물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공,
                맞춤서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심
                등을 목적으로 개인정보를 처리합니다.
              </p>
            </li>
            <li>
              고충 처리
              <p>
                민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지,
                처리 결과 통보 등의 목적으로 개인정보를 처리합니다.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제2조 (개인정보의 처리 및 보유기간)
          </h2>
          <p>
            회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터
            개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서
            개인정보를 처리, 보유합니다.
          </p>
          <p className="mb-3">
            각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
          </p>
          <ul className="list-decimal pl-6 space-y-1">
            <li className="space-y-1">
              홈페이지 회원 가입 및 관리: 사업자/단체 홈페이지 탈퇴 시까지
              <p>다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지</p>
              <p>
                1&#41; 관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는
                해당 수사, 조사 종료 시까지
              </p>
              <p>
                2&#41; 홈페이지 이용에 따른 채권 및 채무관계 잔존 시에는 해당
                채권, 채무 관계 정산 시까지
              </p>
            </li>
            <li className="space-y-1">
              재화 또는 서비스 제공: 재화․서비스 공급완료 및 요금결제․정산 완료
              시까지
              <p>다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지</p>
              <p>
                1&#41; 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른
                표시․광고, 계약내용 및 이행 등 거래에 관한 기록
              </p>
              <p>- 표시․광고에 관한 기록: 6개월</p>
              <p>- 계약 또는 청구에 관한 기록: 5년</p>
              <p>- 소비자 불만 또는 분쟁 처리에 관한 기록: 3년</p>
              <p>
                2&#41; 「통신비밀보호법」 제41조에 따른 통신사실확인자료 보관
              </p>
              <p>
                - 가입자 전기통신일시, 개시․종료 시간, 상대방 가입자 번호,
                사용도수, 발신기지국 위치추적자료: 1년
              </p>
              <p>- 컴퓨터 통신, 인터넷 로그 기록자료, 접속지 추적자료: 3개월</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제3조 (개인정보의 제3자 제공)
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한
              범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등
              개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를
              제3자에게 제공하고 그 외에는 정보주체의 개인정보를 제3자에게
              제공하지 않습니다.
            </li>
            <li>
              회사는 원활한 서비스 제공을 위해 다음의 경우 개인정보보호법 제17조
              제1항 제1호에 따라 정보주체의 동의를 얻어 필요 최소한의 범위로만
              개인정보를 제3자에게 제공할 수 있습니다.
              <p>* 개인정보를 제공받는 자: (예) (주) OOO 카드</p>
              <p>
                * 제공받는 자의 개인정보 이용목적: (예) 이벤트 공동개최 등
                업무제휴 및 제휴 신용카드 발급
              </p>
              <p>
                * 제공하는 개인정보 항목: (예) 성명, 주소, 전화번호, 이메일주소,
                카드결제계좌정보
              </p>
              <p>
                * 제공받는 자의 보유, 이용기간: (예) 신용카드 발급계약에 따른
                거래기간동안
              </p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제4조 (개인정보처리의 위탁)
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
              <p>* 수탁자: (주)아임웹</p>
              <p>
                위탁 내용: 쇼핑몰 호스팅 서비스의 시스템 제공, 모바일 앱 서비스,
                마케팅 서비스 및 부가, 제휴서비스 제공, 알림톡/친구톡/문자메시지
                발송 대행
              </p>
              <p>* 수탁자: OOO PG</p>
              <p>위탁 내용: 결제 및 에스크로 업무</p>
              <p>* 수탁자: OOO 택배</p>
              <p>위탁 내용: 상품 배송 업무</p>
              <p>* 수탁자: OOO 고객센터</p>
              <p>위탁 내용: 고객상담 업무</p>
              <p>* 수탁자: OOO</p>
              <p>위탁 내용: 본인확인 업무</p>
              <p>* 재위탁사</p>
              <p>* 재위탁자: (주)아임웹 → 인포빕(유)</p>
              <p>
                위탁 내용: 문자메시지 발송, 카카오톡 알림톡(정보성 메시지) 발송
                업무
              </p>
              <p>* 재위탁자: (주)아임웹 → (주)루나소프트</p>
              <p>
                위탁 내용: 문자메시지 발송, 카카오톡 알림톡 및 친구톡 발송 업무
              </p>
            </li>
            <li>
              회사는 위탁계약 체결 시 개인정보 보호법 제25조에 따라 필요한
              조치를 취하고 수탁자가 개인정보를 안전하게 처리하는지를 감독하고
              있습니다.
            </li>
            <li>
              위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보
              처리방침을 통해 공개합니다.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제5조 (정보주체 및 법정대리인의 권리와 그 행사 방법)
          </h2>
          <p className="mb-3">
            정보주체는 회사에 대해 언제든지 다음 각 호의 권리를 행사할 수
            있습니다.
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li className="space-y-1">
              처리정지 요구
              <p>
                위 권리 행사는 서면, 전화, 이메일, FAX 등을 통해 가능하며 회사는
                지체 없이 조치합니다.
              </p>
              <p>
                오류 등에 대한 정정 또는 삭제를 요구할 경우 완료 시까지 이용
                또는 제공하지 않습니다.
              </p>
              <p>
                법정대리인이나 위임을 받은 자를 통해서도 권리 행사 가능하며
                위임장은 제출해야 합니다.
              </p>
              <p>
                정보주체는 개인정보 보호법 등 관계 법령을 위반하여 타인의
                개인정보나 사생활을 침해해서는 안 됩니다.
              </p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제6조 (처리하는 개인정보 항목)
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li className="space-y-1">
              홈페이지 회원 가입 및 관리
              <p>
                * 필수항목: 성명, 생년월일, 아이디, 비밀번호, 주소, 전화번호,
                성별, 이메일주소, 아이핀번호
              </p>
              <p>* 선택항목: 결혼 여부, 관심 분야</p>
            </li>
            <li className="space-y-1">
              재화 또는 서비스 제공
              <p>
                * 필수항목: 성명, 생년월일, 아이디, 비밀번호, 주소, 전화번호,
                이메일주소, 아이핀번호, 신용카드번호, 은행계좌정보 등
              </p>
              <p>* 선택항목: 관심분야, 과거 구매내역</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제7조 (개인정보의 파기)
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              개인정보 보유기간의 경과 또는 처리 목적 달성 시 지체 없이
              파기합니다.
            </li>
            <li>
              다른 법령에 따라 계속 보존해야 할 경우 별도로 저장·보관합니다.
            </li>
            <li className="space-y-1">
              파기 절차 및 방법
              <p>* 파기 절차: 파기 사유 발생 시 보호책임자의 승인 후 파기</p>
              <p>
                * 파기 방법: 전자파일은 복구 불가하게, 종이문서는 분쇄 또는 소각
              </p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제8조 (개인정보의 안전성 확보조치)
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>관리적 조치: 내부관리계획 수립, 직원 교육 등</li>
            <li>
              기술적 조치: 접근 권한 관리, 접근통제시스템 설치, 암호화, 보안
              프로그램 설치
            </li>
            <li>물리적 조치: 전산실, 자료보관실 접근 통제</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>맞춤 서비스 제공을 위해 쿠키 사용</li>
            <li>쿠키는 이용자 컴퓨터에 저장됨</li>
            <li>쿠키 설정은 브라우저 옵션을 통해 거부 가능</li>
            <li>쿠키 거부 시 맞춤 서비스 이용에 어려움 발생 가능</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제10조 (개인정보 보호책임자)
          </h2>
          <div className="space-y-1 mb-6">
            <p>▶ 개인정보 보호책임자</p>
            <p>성명: OOO</p>
            <p>직책: OOO</p>
            <p>연락처: 전화번호, 이메일, 팩스번호</p>
          </div>
          <div className="space-y-1">
            <p>▶ 개인정보 보호 담당부서</p>
            <p>부서명: OOO 팀</p>
            <p>연락처: 전화번호, 이메일, 팩스번호</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제11조 (권익침해 구제 방법)
          </h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>
              개인정보 분쟁조정위원회: 1833-6972 / http://www.kopico.go.kr
            </li>
            <li>개인정보침해신고센터: 118 / privacy.kisa.or.kr</li>
            <li>대검찰청: 1301 / http://www.spo.go.kr</li>
            <li>경찰청: 182 / ecrm.police.go.kr/minwon/main</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            제12조 (개인정보 처리방침 시행 및 변경)
          </h2>
          <p>이 개인정보 처리방침은 2025.09.11부터 적용됩니다.</p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
