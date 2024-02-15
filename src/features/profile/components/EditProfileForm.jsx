import Form from "../../../components/Form";
import Input from "../../../components/Input";
import useProfile from "../hooks/useProfile";
import InputImage from "../../../components/InputImage";
import Spinner from "../../../components/Spinner";

export default function EditProfileForm() {
  const {
    userProfile,
    handleInputChange,
    handleImageClear,
    handleImageChange,
    userProfileImage,
    handleEditFormSubmit,
    userProfileImageFileEl,
    loading,
  } = useProfile();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Form
      title={"EDIT PROFILE"}
      buttonText={"DONE"}
      // subButtonText="OR SIGN UP"
      onSubmit={handleEditFormSubmit}
      // onClickSubButton={handleClickSubButton}
    >
      <input
        type="file"
        className="hidden"
        ref={userProfileImageFileEl}
        onChange={handleImageChange}
      />
      <Input
        label="NAME"
        id="name"
        name="name"
        value={userProfile.name}
        onChange={handleInputChange}
        // errorMessage={error.email}
      />
      <Input
        label="EMAIL"
        id="email"
        name="email"
        value={userProfile.email}
        onChange={handleInputChange}
        // errorMessage={error.email}
      />
      <Input
        label="BIO"
        id="bio"
        name="bio"
        value={userProfile.bio}
        onChange={handleInputChange}
        // errorMessage={error.email}
      />
      <InputImage
        label="IMAGE"
        // value={userProfile.image}
        onClick={() => userProfileImageFileEl.current.click()}
        onClear={handleImageClear}
        type="button"
        image={userProfileImage}
        // errorMessage={error.email}
      />
    </Form>
  );
}
