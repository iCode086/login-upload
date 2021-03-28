pragma solidity >=0.4.21 <0.6.0;

contract DStorage {
  string public name = 'DStorage';
  uint public fileCount = 0;
  uint public fileCoun = 0;
  mapping(uint => File) public files;
  string[] public hashArray = new string[](100);
  address owner;
   mapping (address => uint) public occ;
    mapping (address => uint) public all;
     mapping (address => uint) public password;
     //remove public if you donot want password.
     mapping (address => string) public name1;
    string wel ="wel";
    bool[] public votingsss = new bool[](100);
    event Sent(address from);

  struct File {
    uint fileId;
    string fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
    bool t;
    uint voted;
    bool vote;
    

    
   address payable uploader;
  }

  event FileUploaded(
    uint fileId,
    string fileHash,
    uint fileSize,
    string fileType,
    string fileName, 
    string fileDescription,
    uint uploadTime,
    uint voted,
    address payable uploader
  );

  constructor() public {
      owner =msg.sender;
      occ[msg.sender] = 1;
        password[msg.sender]= 123;
         name1[msg.sender]= 'owner';
         //all[msg.sender] = 1;
  }
  
    function login(uint pass, string memory _nam )  public{
        if (occ[msg.sender] == 1)
        {
            
            if (password[msg.sender] == pass)
            { all[msg.sender] = 1;}
            else{
                emit Sent(msg.sender);
                revert();
            }
        
        }
        
        password[msg.sender]=pass;
        name1[msg.sender]= _nam;
        occ[msg.sender] = 1;
        all[msg.sender] = 1;
        
         }
  function logout(string memory _nam)  public{
        
        
        
        all[msg.sender] = 0;
        
         }
       function checkWinninProposalWithReturnValue (uint i) public view returns (bool) {
           bool winner;
           bool f=files[i].vote;
           bool s=files[i].t;
           bool e=votingsss[i];
           uint v =files[i].voted;
        if( v== 3)
        {
            if(f== true)
             {
                if(s==true)
                 {
                   if(e==true)
                   { 
                     winner = true;
                   }
                   
                  }
                  else
                  {
                    winner = false;  
                  }
                
                }
            else 
            {
               winner = false;   
            }
        }
        else {
            
            revert();
        }
        return winner;
    }          
 
function voting( bool _vote,uint i) public payable {
     
string memory _z = 'owner' ;
string memory _y = name1[msg.sender];

     
       
           require (keccak256(abi. encodePacked(_z)) == keccak256(abi. encodePacked(_y)) , "not eligible to vote") ;      
      if(files[i].voted==0)
      {
          files[i].vote=_vote;
          files[i].voted=1;
      }
      else if(files[i].voted==1)
      {
          files[i].t=_vote;
          files[i].voted=2;
      }
       else if(files[i].voted==2)
      {
          votingsss[i]=_vote;
          files[i].voted=3;
      }
      else
      {
          revert();
      }
      
    

    
    
}
  function uploadFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {
    // string memory _ab = "Qmep96bgCmHYLbg3mDjkmXy2ioovZhf4AsQsS9XhrZ4TVM";

    // require (keccak256(abi. encodePacked(_fileHash)) != keccak256(abi. encodePacked(_ab)) ) ;
    // // Make sure the file hash exists

    for(uint i=1; i<=fileCount; i++){
      string memory _ab = hashArray[i];
      require (keccak256(abi. encodePacked(_fileHash)) != keccak256(abi. encodePacked(_ab)) , "Copyright issue") ;
      
    }
require(all[msg.sender] == 1);
    require(bytes(_fileHash).length > 0);
    // Make sure file type exists
    require(bytes(_fileType).length > 0);
    // Make sure file description exists
    require(bytes(_fileDescription).length > 0);
    // Make sure file fileName exists
    require(bytes(_fileName).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));
    // Make sure file size is more than 0
    require(_fileSize>0);
  // bool te = false;
    uint voteds = 0;
    bool t = false;
    bool vote = false;
    bool votes = false;
    // Increment file id
    fileCount ++;

    // Add File to the contract
    files[fileCount] = File(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp,t,voteds,vote, msg.sender);
    hashArray[fileCount]=_fileHash;
    // Trigger an event
    emit FileUploaded(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp,voteds, msg.sender);
  }
}