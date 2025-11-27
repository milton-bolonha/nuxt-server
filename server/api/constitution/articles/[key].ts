export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'constitution/articles')

    const key = getRouterParam(event, 'key');

    if (!key) return []

    const articles: any = {
        'article1': {
            title: 'Article I',
            sections: [
                {
                    title: 'Section 1',
                    content: 'All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.'
                },
                {
                    title: 'Section 2',
                    content: 'The House of Representatives shall be composed of twenty Representatives, divided into two classes, each being composed of ten members, chosen every two months at times determined by the Federal Elections Commission by the People.<br><br>No Person shall be a Representative who shall not have attained to the Age of six Months on ROBLOX, and been one Month a Citizen of the United States, and who shall, when elected, be an Inhabitant of a different United States of America group on ROBLOX; citizenship by an Individual in the United States shall be defined as membership within the Group except for within the ranks “Immigration Office” and “Foreign Ambassador”, unless Congress by majority vote on a public forum grants an exception on an individual basis; one cannot be a Citizen of the United States while inhabiting a different United States of America group on ROBLOX concurrently.<br><br>If vacancies happen by Resignation or otherwise in the House, there shall be special elections to fill such Vacancies.<br><br>The House of Representatives shall chuse their Speaker and other Officers; and shall have the sole Power of Impeachment.'
                },
                {
                    title: 'Section 3',
                    content: 'The Senate of the United States shall be composed of twelve Senators, divided into two classes, each being composed of six members, each class being chosen every four months at times determined by the Federal Election Commission by the People.<br><br>If Vacancies happen by Resignation or otherwise in the Senate, there shall be special elections to fill such Vacancies.<br><br>No Person shall be a Senator who shall not have attained to the Age of six Months on ROBLOX, and been two Months a Citizen of the United States, and who shall, when elected, be an Inhabitant of a different United States of America group on ROBLOX.<br><br>The Vice President of the United States shall be President of the Senate, but shall have no Vote, unless they be equally divided.<br><br>The Senate shall chuse their other Officers, and also a President pro tempore, in the Absence of the Vice President, or when he shall exercise the Office of President of the United States.<br><br>The Senate shall have the sole Power to try all Impeachments. When sitting for that Purpose, they shall be on Oath or Affirmation. When the President of the United States is tried, the Chief Justice shall preside: And no Person shall be convicted without the Concurrence of two thirds of the Senate’s Members on a public forum vote.<br><br>Judgement in Cases of Impeachment shall not extend further than to removal from Office, and disqualification to hold and enjoy any Office of honor, Trust or Profit under the United States: but the Party convicted shall nevertheless be liable and subject to Indictment, Trial, Judgement and Punishment, according to Law.'
                },
                {
                    title: 'Section 4',
                    content: 'The Times, Places and Manner of holding Elections for Senators and Representatives, shall be prescribed by the Congress as a body; but the Federal Elections Commission, ran by Clan Managers, may at any time make or alter such Regulations.<br><br>The Houses of Congress shall assemble at least once in every Week.'
                },
                {
                    title: 'Section 5',
                    content: 'A ⅓ of members of each shall count as a Quorum to do Business in-game except in cases of Impeachments, Expulsions and Convictions; a simple majority of each entire Body shall be required to do Business on public forum; a two thirds majority of each entire Body on public forum shall be required to do Business requiring two thirds votes; but a smaller Number may adjourn from day to day, and may be authorized to compel the Attendance of absent Members, in such Manner, and under such Penalties as each House may provide.<br><br>Each House may determine the Rules of its Proceedings, punish its Members for disorderly behavior, and, with the Concurrence of two thirds, expel a Member and or Officer; in the cases of expelling Officers, each House must specify whether the Officer shall retain their Membership therein or they shall lose it as well.<br><br>Each House shall keep an online Database of its Proceedings, and from time to time publish the same, excepting such Parts as may in their Judgement require Secrecy; and the Yeas and Nays of the Members of either House on any business shall be recorded.<br><br>Neither House shall, without the Consent of the other, adjourn for more than one Week, nor to any other Place than that in which the two Houses shall be sitting.'
                },
                {
                    title: 'Section 6',
                    content: 'The Senators and Representatives shall in all Cases, except Treason, Felony and Breach of the Peace, be privileged from Arrest during their Attendance at the Session of their respective Houses, and in going to and returning from the same; and for any Speech or Debate in either House, they shall not be questioned in any other Place.<br><br>No Senator or Representative shall, during the Time for which he was elected, be appointed to a civil office except by granted leave of Congress.'
                },
                {
                    title: 'Section 7',
                    content: 'Every Bill which shall have passed the House of Representatives and the Senate, shall, before it become a Law, be presented to the President of the United States; If he approve he shall sign it, but if not he shall return it, with his Objections to that House in which it shall have originated, who shall enter the Objections at large on their Database, and proceed to reconsider it. If after such Reconsideration two thirds of that House shall agree to pass the Bill, it shall be sent, together with the Objections, to the other House, by which it shall likewise be reconsidered, and if approved by two thirds of that House, it shall become a Law. But in all such Cases the Votes of both Houses shall be determined by Yeas and Nays, and the Names of the Persons voting for and against the Bill shall be entered on the Database of each House respectively. If any Bill shall not be returned by the President within ten Days after it shall have been presented to him, the Same shall be a Law, in like Manner as if he had signed it, unless the Congress by their Adjournment prevent its Return, in which Case it shall not be a Law.<br><br>Every Order, Resolution, or Vote which has the force of law to which the Concurrence of the Senate and House of Representatives may be necessary (except on a question of Adjournment) shall be presented to the President of the United States; and before the Same shall take Effect, shall be approved by him, or being disapproved by him, shall be repassed by two thirds of the Senate and House of Representatives, according to the Rules and Limitations prescribed in the Case of a Bill.'
                },
                {
                    title: 'Section 8',
                    content: 'The Congress shall have Power to pay the Debts and provide for the common Defence and general Welfare of the United States; but all Duties, Imposts and Excises shall be uniform throughout the United States;<br><br>To borrow Money on the credit of the United States,<br><br>To regulate all Commerce and Commerce with the Indian Tribes;<br><br>To establish a uniform Rule of Naturalization, and uniform Laws on the subject of Bankruptcies throughout the United States;<br><br>To promote the Progress of Science and useful Arts, by securing for limited Times to Authors and Inventors the exclusive Right to their respective Writings and Discoveries;<br><br>To constitute tribunals inferior to the supreme Court;<br><br>To declare War, grant Letters of Marque and Reprisal, and make Rules concerning Captures on Land and Water;<br><br>To raise and support Armies, but no Appropriation of Money to that Use shall be for a longer Term than two Months;<br><br>To provide and maintain a Navy;<br><br>To make Rules for the Government and Regulation of the land and naval Forces;<br><br>To provide for calling forth the Militia to execute the Laws of the Union, suppress Insurrections and repel Invasions.<br><br>To provide for organizing, arming, appointing Officers of, and disciplining, the Militia, and for governing such Part of them as may be employed in the Service of the United States;<br><br>To exercise exclusive Legislation in all Cases whatsoever, over such District as may, by the Acceptance of Congress, be come the Seat of the Government of the United States, and to exercise like Authority over all Places of the United States for the Erection of Forts, Magazines, Arsenals, dock-Yards, and other needful buildings;—And<br><br>To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers, and all other Powers vested by this Constitution in the Government.'
                },
                {
                    title: 'Section 9',
                    content: 'The Privilege of the Writ of Habeas Corpus shall not be suspended, unless when in Cases of Rebellion or Invasion the public Safety may require it.<br><br>No Bill of Attainder or ex post facto Law shall be passed.'
                },
                {
                    title: 'Section 10',
                    content: 'No Municipality shall enter into any Treaty, Alliance, or Confederation; grant Letters of Marque and Reprisal coin money; emit Bills of Credit; pass any Bill of Attainder, ex post facto Law, or Law impairing the Obligation of Contracts, or grant any Title of Nobility.<br><br>No Municipality shall, without the Consent of Congress, lay any Duty of Tonnage, keep Troops, or Ships of War in time of Peace, enter into any Agreement or Compact with another Municipality, or with a foreign Power, or engage in War, unless actually invaded, or in such imminent Danger as will not admit of delay.'
                },
                {
                    title: 'Section 11',
                    content: 'The Senate and House of Representatives shall have the Power to create respective as well as joint- Congressional Committees for the purpose of sub-organization and investigation, whose Chairman and Vice Chairman shall be voted on by their Respective Houses, or in the case of joint committees the entire Congress assembled; and shall be regulated by the election Committee established by Congress.'
                }
            ]
        },
        'article2': {
            title: 'Article II',
            sections: [
                {
                    title: 'Section 1',
                    content: 'The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of six Months, and, together with the Vice President, chosen for the same Term, be elected, as follows<br><br>The President shall be elected by popular vote of electors, who must be current citizens who have been naturalized for at least one Month and who are not Inhabitants of a different United States of America group on ROBLOX. After the Votes shall have been counted, the Person having the greatest Number of Votes shall become President.<br><br>The Congress may determine the Day on which the Electors shall give their votes.<br><br>No person except a Citizen of the United States shall be eligible to the Office of President; neither shall any Person be eligible to that Office who shall not have attained to the Age six Months on ROBLOX, and been six Months a Citizen within the United States, and who shall, when elected, be an Inhabitant of a different United States of America group on ROBLOX. In Case of the Removal of the President from Office, or of his actual Death, Resignation, or Inability to discharge the Powers and Duties of the said Office, the Same shall devolve on the Vice President, and the Congress may by Law provide for the Case of Removal, actual Death, Resignation or Inability, both of the President and Vice President, declaring what Officer shall then act as President, and such Officer shall act accordingly, until the Disability be removed, or a President shall be elected.<br><br>Before he enter on the Execution of his Office, he shall take the following Oath or Affirmation in-game:—‘‘I do solemnly swear (or affirm) that I will faithfully execute the Office of President of the United States, and will to the best of my Ability, preserve, protect and defend the Constitution of the United States.’’'
                },
                {
                    title: 'Section 2',
                    content: 'The President shall be Commander in Chief of the Army and Navy of the United States, and of the Militia, when called into the actual Service of the United States; he may require the Opinion, in writing, of the principal Officer in each of the executive Departments, upon any Subject relating to the Duties of their respective Offices, and he shall have Power to grant Reprieves and Pardons for Offences against the United States, except in Cases of Impeachment.<br><br>He shall have Power, by and with the Advice and Consent of the Senate, to make Treaties, provided two thirds of the Senators present concur; and he shall nominate, and by and with the Advice and Consent of the Senate, shall appoint Ambassadors, other public Ministers and Consuls, Judges of the supreme Court, and all other Officers of the United States, whose Appointments are not herein otherwise provided for, and which shall be established by Law: but the Congress may by Law vest the Appointment of such inferior Officers, as they think proper, in the President alone, in the Courts of Law, or in the Heads of Departments.'
                },
                {
                    title: 'Section 3',
                    content: 'He shall from time to time give to the Congress Information of the State of the Union, and recommend to their Consideration such Measures as he shall judge necessary and expedient; he may, on extraordinary Occasions, convene both Houses, or either of them, and in Case of Disagreement between them, with Respect to the Time of Adjournment, he may adjourn them to such Time as he shall think proper; he shall receive Ambassadors and other public Ministers; he shall take Care that the Laws be faithfully executed, and shall Commission all the Officers of the United States.'
                },
                {
                    title: 'Section 4',
                    content: 'The President, Vice President and all civil Officers of the United States, shall be removed from Office on Impeachment for, and Conviction of, Treason, Bribery, severe inactivity, or other high Crimes and Misdemeanors.'
                }
            ]
        },
        'article3': {
            title: 'Article III',
            sections: [
                {
                    title: 'Section 1',
                    content: 'The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish. The Judges, both of the supreme and inferior Courts, shall hold their Offices during good Behaviour.'
                },
                {
                    title: 'Section 2',
                    content: 'The judicial Power shall extend to all Cases, in Law and Equity, arising under this Constitution, the Laws of the United States, and Treaties made, or which shall be made, under their Authority;—to all Cases affecting Ambassadors, other public Ministers and Consuls;— to all Cases of admiralty and maritime Jurisdiction;—to Controversies to which the United States will be a party;— to Controversies between two or more Municipalities;— between a Municipality and Citizens of another Municipality;— between Citizens of different Municipalities,— between Citizens of the same Municipality claiming Lands under Grants of different Municipalities, and between a Municipality, or the Citizens thereof, and foreign States, Citizens or Subjects. No court shall be established by a Municipality.<br><br>In all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which a Municipality shall be Party, the supreme Court shall have original Jurisdiction. In all the other Cases before mentioned, the supreme Court shall have appellate Jurisdiction, both as to Law and Fact, with such Exceptions, and under such Regulations as the Congress shall make.<br><br>The Trial of all Crimes, except in Cases of Impeachment, shall be by Jury or, with consent of the defendant or defendants, Bench; and such Trial shall be held in a federal district Court, except for cases arising in the Army and Navy of the United States and the Militia, whose Trials shall be held in a Place or Places as the Congress may by Law have directed.'
                },
                {
                    title: 'Section 3',
                    content: 'Treason against the United States, shall consist only in levying War against them, or in adhering to their Enemies, giving them Aid and Comfort. No Person shall be convicted of Treason unless on the Testimony of two Witnesses to the same overt Act, or on Confession in open Court.<br><br>The Congress shall have Power to declare the Punishment of Treason, but no Attainder of Treason shall work Corruption of Blood, or Forfeiture except during the Life of the Person attainted.'
                },
                {
                    title: 'Section 4',
                    content: 'The supreme Court shall have the power at anytime when it deems necessary to exercise a Review of the Executive or Legislative branches, and through this exercise may overturn any Law, executive Order, or other action if it finds it to be unconstitutional or unlawful; the supreme Court may issue all Writs necessary or appropriate in aid of its respective jurisdictions to carry out these Reviews.'
                },
                {
                    title: 'Section 5',
                    content: 'Invested in all courts of the Judiciary shall be the ability to issue Warrants for arrest upon entering of charges by the federal Government;<br><br>Unless a trial occurs within seventy two hours of the issuance of the Warrant and charges have been actively pursued by the federal Government for its duration, it shall be removed.<br><br>The supreme Court shall have the sole power to issue arrest Warrants on groups, and shall remove them unless a trial occurs within seventy two hours of the issuance of the Warrant and charges have been actively pursued by the federal Government for its duration.'
                }
            ]
        },
        'article4': {
            title: 'Article IV',
            sections: [
                {
                    title: 'Section 1',
                    content: 'Full faith and Credit shall be given in each Municipality to the public Acts, Records and Proceedings of every other Municipality. And the Congress may by general Laws prescribe the Manner in which such Acts, Records and Proceedings shall be proved, and the Effect thereof.'
                },
                {
                    title: 'Section 2',
                    content: 'Americans shall be entitled to all Privileges and Immunities in the several Municipalities'
                },
                {
                    title: 'Section 3',
                    content: 'New Municipalities may be admitted by Congress into this Union but no new Municipality shall be formed or erected within the Jurisdiction of any other Municipality; nor any Municipality be formed by the Junction of two or more Municipalities, or Parts of Municipalities, without the Consent of the Legislatures of the Municipalities concerned as well as of the Congress.<br><br>The Congress shall have Power to dispose of and make all needful Rules and Regulations respecting the Territory or other Property belonging to the United States; and nothing in this Constitution shall be so construed as to Prejudice any Claims of the United States, or of any particular Municipality.'
                },
                {
                    title: 'Section 4',
                    content: 'The United States shall guarantee to every Municipality in this Union a Republican Form of Government, and shall protect each of them against Invasion; and on Application of the Legislature, or of the Executive (when the Legislature cannot be convened) against domestic Violence.'
                }
            ]
        },
        'article5': {
            title: 'Article V',
            sections: [
                {
                    title: 'Section 1',
                    content: 'The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution, which shall take effect after review, comment and approval of a majority of the Supreme Court sitting for that purpose. Such review, comment and approval, or lack of approval, shall be transmitted by the Supreme Court within ten days. If the Supreme Court shall not transmit any review, comment, approval, or lack of approval, within ten days, it shall be returned to the Congress as not approved by the Supreme Court.'
                },
                {
                    title: 'Section 2',
                    content: 'The Congress may, after receiving notice of rejection of a proposed amendment by the Supreme Court, return such amendment to the floor of each Chamber to be approved by two-thirds of the total membership of each chamber, in which case it shall take effect.'
                }
            ]
        }
    };

    if (!Object.hasOwn(articles, key)) return [];

    return articles[key];
})
