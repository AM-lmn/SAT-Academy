import React from 'react'
import { View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import styles from '../../styles';

export default function Links({route}) { 
  var link;
  switch(route.params.site) {
    case 'CB Practice Test 1': 
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-1.pdf'; break;
    case 'CB Practice Test 2':
      link = 'https://cdn.kastatic.org/KA-share/sat/2-5LSA07-Practice2.pdf'; break;
    case 'CB Practice Test 3':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-3.pdf'; break;
    case 'CB Practice Test 4':
      link = 'https://cdn.kastatic.org/KA-share/sat/2-5LSA09-Practice4.pdf'; break;
    case 'CB Practice Test 5':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-5.pdf'; break;
    case 'CB Practice Test 6':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-6.pdf'; break;
    case 'CB Practice Test 7':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-7.pdf'; break;
    case 'CB Practice Test 8':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-8.pdf'; break;
    case 'CB Practice Test 9':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-9.pdf'; break;
    case 'CB Practice Test 10':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-test-10.pdf'; break;
    case 'April QAS 2019':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/07/April-2019-SAT-Tests.pdf'; break;
    case 'March QAS 2021':
      link = 'https://share.dmca.gripe/5bmNWpw2K2D53KR9.pdf'; break;
    case 'March QAS 2020':
      link = 'https://share.dmca.gripe/ct8iIDtq0HSVTdZA.pdf'; break;
    case 'October QAS 2019':
      link = 'https://share.dmca.gripe/8S36vTZeuim8oJEv.pdf'; break;
    case 'PSAT NMSQT Practice Test 1':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-nmsqt-practice-test-1.pdf'; break;
    case 'PSAT NMSQT Practice Test 2':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-nmsqt-practice-test-2.pdf'; break;
    case 'PSAT 10 Practice Test 1':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-10-practice-test-1.pdf'; break;
    case 'PSAT 10 Practice Test 2':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-10-practice-test-2.pdf'; break;
    case 'October 2020 PSAT':
      link = 'https://share.dmca.gripe/T5whGsuHpQme4KPU.pdf'; break;
    case 'October 2020 SAT':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/11/October-SAT-2020-Test.pdf'; break;
    case 'October 2019 PSAT':
      link = 'https://share.dmca.gripe/BmpxSL743dlRBKWT.pdf'; break;
    case 'November 16 2019 PSAT QAS':
      link = 'https://share.dmca.gripe/RVvhYFkat9GeKIYH.pdf'; break;
    case 'PSAT 10 April 2019':
      link = 'https://share.dmca.gripe/E9nPyb1AkbtXZpf3.pdf'; break;
    case 'PSAT 8 9 Practice Test 1':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-8-9-practice-test-1.pdf'; break;
    case 'May 2019 SAT':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/07/May-2019-SAT-U.S.-Test.pdf'; break;
    case 'May 2019 International Practice Test':
      link = 'https://www.docdroid.net/uA4dr8X/may-2019-international-sat-qas-pdf'; break;
    case 'November 24 2018 PSAT':
      link = `https://share.dmca.gripe/cyys9WeGbpOhr7As.pdf`; break;
    case 'March 9 2019 SAT':
      link = 'https://share.dmca.gripe/3BUn8RTXJcwJ1ErL.pdf'; break;
    case 'October 10 2018 PSAT':
      link = 'https://share.dmca.gripe/eiqxKHccIdIArb3b.pdf'; break;
    case 'May 2018 QAS':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/07/May-2018-US-SAT-Test.pdf'; break;
    case 'April 2018 QAS':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/07/April-2018-SAT-Test.pdf'; break;
    case 'March 2018 QAS':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/07/March-2018-SAT-Test.pdf'; break;
    case 'October 25 2017 PSAT':
      link = 'https://share.dmca.gripe/PpJFz6cQUc7rap3F.pdf'; break;
    case 'PSAT October 14 2017':
      link = 'https://share.dmca.gripe/QpTg925L33MInnAr.pdf'; break;
    case 'PSAT October 11 2017':
      link = 'https://share.dmca.gripe/4UPZ1ILcpTuK9PB2.pdf'; break;
    case 'PSAT 10 Spring 2017':
      link = 'https://share.dmca.gripe/3BESajXXBD80RmMY.pdf'; break;
    case 'May 2017 QAS':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/07/May-2017-SAT-test.pdf'; break;
    case 'April 2017 QAS':
      link = 'https://focusonlearningcenter.com/wp-content/uploads/2020/07/April-2017-SAT-Test.pdf'; break;
    case 'PSAT November 2 2016':
      link = 'https://share.dmca.gripe/0AwhU10UAgAezH9y.pdf'; break;
    case 'PSAT October 19 2016':
      link = 'https://www.docdroid.net/AHEvJWZ/2016-psat-wednesday-version-10-19-16-1-pdf'; break;
    case 'PSAT October 15 2016':
      link = 'https://share.dmca.gripe/gMXYWuRM8C3FqFdo.pdf'; break;
    case 'PSAT October 28 2015':
      link = 'https://share.dmca.gripe/rWOhBho8Z7czDlVS.pdf'; break;
    case 'PSAT October 14 2015':
      link = 'https://share.dmca.gripe/XR4i2STcjTmpFGJw.pdf'; break;
    case 'April 24 2018 SAT':
      link = 'https://docdro.id/wJXIHk6'; break;
    case 'Sample SAT Answer Sheet':
      link = 'https://collegereadiness.collegeboard.org/pdf/sat-practice-answer-sheet.pdf'; break;
    case 'Sample PSAT Answer Sheet':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-nmsqt-practice-answer-sheet.pdf'; break;
    case 'CB Practice Test 1 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-1.pdf'; break;
    case 'CB Practice Test 2 Answers':
      link = 'https://cdn2.hubspot.net/hubfs/360031/PrepScholar-scoring-sat-practice-test-2.pdf'; break;
    case 'CB Practice Test 3 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-3.pdf'; break;
    case 'CB Practice Test 4 Answers':
      link = 'https://cdn.kastatic.org/KA-share/sat/scoring-sat-practice-test-4.pdf'; break;
    case 'CB Practice Test 5 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-5.pdf'; break;
    case 'CB Practice Test 6 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-6.pdf'; break;
    case 'CB Practice Test 7 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-7.pdf'; break;
    case 'CB Practice Test 8 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-8.pdf'; break;
    case 'CB Practice Test 9 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-9.pdf'; break;
    case 'CB Practice Test 10 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-sat-practice-test-10.pdf'; break;
    case 'PSAT/NMSQT Practice Test 1 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-psat-nmsqt-practice-test-1.pdf'; break;
    case 'PSAT/NMSQT Practice Test 2 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/scoring-psat-nmsqt-practice-test-2.pdf'; break;
    case 'PSAT 10 Practice Test 1 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-10-practice-test-1-scoring-guide.pdf'; break;
    case 'PSAT 10 Practice Test 2 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-10-practice-test-2-scoring-guide.pdf'; break;
    case 'PSAT 10 April 2019 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-10-understanding-scores-april-2019.pdf'; break;
    case 'PSAT 8/9 Practice Test 1 Answers':
      link = 'https://collegereadiness.collegeboard.org/pdf/psat-8-9-practice-test-1-scoring-guide.pdf'; break;
    case 'PSAT 10/11/17 and PSAT 10/25/17 Answers':
      link = 'https://www.docdroid.net/PcgbtKe/2017-psat-answers-all-test-dates-pdf#page=2'; break;
    case 'PSAT 11/2/16 Answers':
      link = 'https://setonschool.net/wp-content/uploads/2016/12/psat-nmsqt-understanding-scores-2016.pdf'; break;
    case 'PSAT 10/28/15 Answers':
      link = 'https://www.docdroid.net/0JKsX9H/2015-wednesday-psats-answer-key-and-scoring-pdf#page=14'; break;
    case 'Ivy Global SAT Practice Test 1':
      link = 'https://downloads.ivyglobal.com/sat/Courses/sat_online_test_1.pdf'; break;
    case 'Ivy Global SAT Practice Test 2':
      link = 'https://downloads.ivyglobal.com/sat/Courses/sat_online_test_2.pdf'; break;
  }

  function LoadingIndicatorView() {
    return (
      <View style={styles.hubLoading}>
        <ActivityIndicator animating={true} color={Colors.red800} size='large' />
      </View>
    )
  }

  var alerts;
  switch(route.params.type) {
    case 'SAT':
      alerts = `
      window.alert("You are about to take an SAT Test, make sure to use pencil and paper. Ideally, use the College Board sample answer sheet. After you finish, score yourself with the answer key and scoring guidelines, then record your score.");
      setTimeout('window.alert("You have 5 minutes left for the Reading section.")', 3600000);
      setTimeout('window.alert("Time is up for the Reading section. There will now be a 10-minute break.")', 3900000);
      setTimeout('window.alert("Your 10-minute break has ended. Now begin work on the Writing section.")', 4500000);
      setTimeout('window.alert("You have 5 minutes left for the Writing section.")', 6300000);
      setTimeout('window.alert("Time is up for the Writing section. There is no break in-between the Writing section and Math w/o calc section, so now begin work on the Math w/o calc section.")', 6600000);
      setTimeout('window.alert("You have 5 minutes left for the Math w/o calc section.")', 7800000);
      setTimeout('window.alert("Time is up for the Math w/o calc section. There will now be a 5-minute break.")', 8100000);
      setTimeout('window.alert("Your 5-minute break has ended. Now begin work on the Math w/ calc section.")', 8400000);
      setTimeout('window.alert("You have 5 minutes left for the Math w/ calc section.")', 11400000);
      setTimeout('window.alert("Time is up for the Math with calculator section. If your particular test has an essay section, ignore it, since the College Board is currently discontinuing the SAT with Essay.")', 11700000);
      setTimeout('window.alert("You have just completed an entire SAT. Use the answer key and the scoring guidelines to score yourself, and then record your score.")', 11710000);
    `; break;
    case 'PSAT':
      alerts = `
        window.alert("You are about to take a PSAT Test, make sure to use pencil and paper. Ideally, use the College Board sample answer sheet. After you finish, score yourself with the answer key and scoring guidelines, then record your score.");
        setTimeout('window.alert("You have 5 minutes left for the Reading section.")', 3300000);
        setTimeout('window.alert("Time is up for the Reading section. There will now be a 5-minute break.")', 3600000);
        setTimeout('window.alert("Your 5-minute break has ended. Now begin work on the Writing section.")', 3900000);
        setTimeout('window.alert("You have 5 minutes left for the Writing section.")', 5700000);
        setTimeout('window.alert("Time is up for the Writing section. There is no break in-between the Writing section and Math w/o calc section, so now begin work on the Math w/o calc section.")', 6000000);
        setTimeout('window.alert("You have 5 minutes left for the Math w/o calc section.")', 7200000);
        setTimeout('window.alert("Time is up for the Math w/o calc section. There will now be a 5-minute break.")', 7500000);
        setTimeout('window.alert("Your 5-minute break has ended. Now begin work on the Math w/ calc section.")', 7800000);
        setTimeout('window.alert("You have 5 minutes left for the Math w/ calc section.")', 10200000);
        setTimeout('window.alert("Time is up for the Math with calculator section.")', 10500000);
        setTimeout('window.alert("You have just completed an entire PSAT. Use the answer key and the scoring guidelines to score yourself, and then record your score.")', 10510000);
      `; break;
    case 'Answer Sheet':
      alerts = `window.alert("This is a sample answer sheet that the College Board has provided for students to record answers.")`; break;
    case 'Answer Key':
      alerts = `window.alert("Use this document to score the SAT you just took!")`; break;
  }
  

  console.log(link);
  return <WebView 
    source={{ uri: link }}
    renderLoading={LoadingIndicatorView}
    startInLoadingState={true}
    originWhitelist={['*']}
    javaScriptEnabled={true}
    onMessage={() => {}}
    injectedJavaScript={alerts}
  />;
}