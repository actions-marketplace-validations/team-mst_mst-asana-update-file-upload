# github action to upload a file on asana.com

This action uploads a file to an update of a pulse on asana.com.

## Inputs

### `asana-api-key`

**Required** asana.com. This parameter should be stored in the GitHub secrets.

### `asana-update-id`

**Required** Update ID for which a file needs to be attached.

### `asana-file-path`

**Required** Path of a file which needs to be uploaded.

## Outputs

### `asana-response`

Response from monday.com in case the file is successfully uploaded.

## Example usage
```yaml
- name: Send update to asana.com pulse
  uses: team-mst/mst-asana-update-file-upload@v1
  with:
    asana-api-key: ${{ secrets.ASANA_API_KEY }}
    asana-update-id: 123
    asana-file-path: "test-file.zip"
```